import csv

from db import session, Contact

CSV_FILE_PATH = './fixtures/contacts.csv'

def load_fixtures():
    session.query(Contact).delete()
    session.commit()
    print("Database deleted successfully!")

    with open(CSV_FILE_PATH, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        
        for row in reader:
            contact = Contact(
                first_name=row['first_name'],
                last_name=row['last_name'],
                email=row['email'],
                address=row['address'],
                comment=row['comment'],
                job=row['job'],
            )
            
            session.add(contact)
        
        session.commit()
        print("Fixture data loaded successfully!")

