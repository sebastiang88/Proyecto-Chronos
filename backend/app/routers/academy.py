from fastapi import APIRouter, Depends, HTTPException, status
from datetime import datetime
from typing import List
from app.models.academy import AcademyCreate, AcademyResponse, AcademyUpdate
from bson import ObjectId
from app.database.mongodb import mongodb
from app.routers.auth import get_current_user

router = APIRouter()

@router.post("/academy", response_model=AcademyResponse)
async def create_academy(academy: AcademyCreate, current_user: dict = Depends(get_current_user)):
    db = mongodb.get_database()
    academy_collection = db.academy
    
    academy_dict = academy.dict()
    academy_dict["user_id"] = str(current_user["_id"])
    academy_dict["created_at"] = datetime.utcnow()
    academy_dict["updated_at"] = datetime.utcnow()
    
    result = academy_collection.insert_one(academy_dict)
    academy_dict["id"] = str(result.inserted_id)
    
    return AcademyResponse(**academy_dict)

@router.get("/academy", response_model=List[AcademyResponse])
async def get_academy_records(current_user: dict = Depends(get_current_user)):
    db = mongodb.get_database()
    academy_collection = db.academy
    
    records = academy_collection.find({"user_id": str(current_user["_id"])})
    return [AcademyResponse(**record, id=str(record["_id"])) for record in records]

@router.get("/academy/{record_id}", response_model=AcademyResponse)
async def get_academy_record(record_id: str, current_user: dict = Depends(get_current_user)):
    db = mongodb.get_database()
    academy_collection = db.academy
    
    try:
        record = academy_collection.find_one({
            "_id": ObjectId(record_id),
            "user_id": str(current_user["_id"])
        })
    except:
        raise HTTPException(status_code=400, detail="Invalid record ID")
    
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")
    
    return AcademyResponse(**record, id=str(record["_id"]))

@router.put("/academy/{record_id}", response_model=AcademyResponse)
async def update_academy_record(record_id: str, academy_update: AcademyUpdate, current_user: dict = Depends(get_current_user)):
    db = mongodb.get_database()
    academy_collection = db.academy
    
    try:
        record = academy_collection.find_one({
            "_id": ObjectId(record_id),
            "user_id": str(current_user["_id"])
        })
    except:
        raise HTTPException(status_code=400, detail="Invalid record ID")
    
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")
    
    update_data = academy_update.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    academy_collection.update_one(
        {"_id": ObjectId(record_id)},
        {"$set": update_data}
    )
    
    updated_record = academy_collection.find_one({"_id": ObjectId(record_id)})
    return AcademyResponse(**updated_record, id=str(updated_record["_id"]))

@router.delete("/academy/{record_id}")
async def delete_academy_record(record_id: str, current_user: dict = Depends(get_current_user)):
    db = mongodb.get_database()
    academy_collection = db.academy
    
    try:
        record = academy_collection.find_one({
            "_id": ObjectId(record_id),
            "user_id": str(current_user["_id"])
        })
    except:
        raise HTTPException(status_code=400, detail="Invalid record ID")
    
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")
    
    academy_collection.delete_one({"_id": ObjectId(record_id)})
    return {"message": "Record deleted successfully"}
