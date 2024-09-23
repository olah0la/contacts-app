from fastapi import FastAPI

from db import Contact, Job, session
from schemas import ContactCreate
from fixtures import load_fixtures

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    load_fixtures()

@app.get("/")
async def root():
    steven = Contact(job="IT", email="steven@stevenola.com")
    print(steven)
    session.add_all([steven])
    session.commit()
    return {"message": "Hello World"}


@app.post("/contacts")
async def create_contact(contact: ContactCreate):
    contact = Contact(**contact.dict())
    session.add(contact)
    session.commit()
    return contact

@app.get("/contacts")
async def get_contacts():
    contacts = session.query(Contact).all()
    return contacts

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

@app.get("/jobs/{job_id}/emails")
async def get_emails(job_id: int):
    "get all emails of a job"
    contacts = session.query(Contact).filter(Contact.job_id == job_id).all()
    return [contact.email for contact in contacts]
