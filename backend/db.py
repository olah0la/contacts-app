from typing import Optional

from sqlalchemy import create_engine, Integer, String, ForeignKey
from sqlalchemy.orm import sessionmaker, DeclarativeBase, mapped_column, Mapped

engine = create_engine("sqlite:///contacts.db", echo=True)
SessionLocal = sessionmaker(bind=engine)
session = SessionLocal()

class Base(DeclarativeBase):
    pass

class Job(Base):
    __tablename__ = "jobs"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String)

    def __repr__(self):
        return f"<Job (id={self.id!r}, name={self.name!r})>"

class Contact(Base):
    __tablename__ = "contacts"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    first_name: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    last_name: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    email: Mapped[str] = mapped_column(String, unique=True)
    address: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    comment: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    job: Mapped[str] = mapped_column(String)
    job_id: Mapped[int] = mapped_column(Integer, ForeignKey("jobs.id"))

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.job_id = self.get_or_create_job(self.job).id

    def get_or_create_job(self, job_name: str):
        job = session.query(Job).filter_by(name=job_name).first()
        if job is None:
            job = Job(name=job_name)
            session.add(job)
            session.commit()
        return job

    def __repr__(self):
        return f"<Contact (id={self.id!r}, job={self.job!r}, email={self.job!r})>"
    
Base.metadata.create_all(engine)
