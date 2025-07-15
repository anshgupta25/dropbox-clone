from pydantic import BaseModel
from datetime import datetime

class FileSchema(BaseModel):
    id: int
    filename: str
    filepath: str
    filetype: str
    upload_date: datetime

    class Config:
        orm_mode = True
