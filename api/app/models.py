from datetime import datetime


from app import db


class TestModel(db.Model):

    __tablename__ = 'test_models'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.now, onupdate=datetime.now)


class User(db.Model):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.now, onupdate=datetime.now)

    @staticmethod
    def get_all():
        return User.query.all()

    def save(self):
        db.session.add(self)
        db.session.commit()

    def json(self):
        return {
            "id": self.id,
            "name": self.name,
            "createdAt": self.created_at.isoformat(),
            "updatedAt": self.updated_at.isoformat()
        }

    @staticmethod
    def lookup(email=None, name=None):
        user1 = email and User.query.filter_by(email=email).first()
        user2 = name and User.query.filter_by(name=name).first()

        return user1 or user2

    @staticmethod
    def exists(email=None, name=None):
        return User.lookup(email=email, name=name) is not None
