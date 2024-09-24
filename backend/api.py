from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi_pagination import Page, add_pagination
from fastapi_pagination.ext.sqlalchemy import paginate
from sqlalchemy.orm import Session
from sqlalchemy import select


from db import Contact, Job, session, SessionLocal
from schemas import ContactSchema, ContactOut
from fixtures import load_fixtures

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)
add_pagination(app)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.on_event("startup")
async def startup_event():
    load_fixtures()

@app.post("/contacts")
async def create_contact(contact: ContactCreate):
    contact = Contact(**contact.dict())
    session.add(contact)
    session.commit()
    return contact

@app.get("/contacts", response_model=Page[ContactOut])
async def get_contacts(db: Session = Depends(get_db)) -> Page[ContactOut]:
    return paginate(db, select(Contact).order_by(Contact.id))

@app.get("/contacts/{contact_id}")
async def get_contact(contact_id: int):
    contact = session.query(Contact).filter(Contact.id == contact_id).first()
    return contact

@app.put("/contacts/{contact_id}")
async def update_contact(contact_id: int, contact: ContactCreate):
    contact = session.query(Contact).filter(Contact.id == contact_id).first()
    for key, value in contact.dict().items():
        setattr(contact, key, value)
    session.commit()
    return contact

@app.delete("/contacts/{contact_id}")
async def delete_contact(contact_id: int):
    contact = session.query(Contact).filter(Contact.id == contact_id).first()
    session.delete(contact)
    session.commit()
    return {"message": "Contact deleted successfully"}

@app.get("/jobs/")
async def get_jobs():
    jobs = session.query(Job).all()
    return jobs

@app.get("/jobs/{job}/emails")
async def get_emails(job: str):
    "get all emails of a job"
    contacts = session.query(Contact).filter(Contact.job == job).all()
    return [contact.email for contact in contacts]