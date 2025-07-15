from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from .database import Base

class File(Base):
    __tablename__ = 'files'

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, unique=True, nullable=False)
    filepath = Column(String, nullable=False)
    filetype = Column(String, nullable=False)
    upload_date = Column(DateTime, default=datetime.utcnow)


