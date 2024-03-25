import sqlite3
import json
from flask import Flask, jsonify, request, abort
from argparse import ArgumentParser


DB = 'wireless_assignment.sqlite'


def get_row_as_dict(row):
    row_dict = {
        'Id': row[0],
        'Name': row[1],
        'Date': row[2],
        'Time': row[3],
        'Seats': row[4],
        'booked': row[5],
        'selected': row[6],
        'Location': row[7],
    }

    return row_dict

def get_row_as_dict2(row):
    row_dict2 = {
        'Seats': row[0],
        'booked': row[1],
        'selected': row[2],
    }

    return row_dict2

def get_movierow_as_dict(row):
    m_row_dict = {
        'm_id': row[0],
        'm_name': row[1],
        'm_poster': row[2],
        'm_summary': row[3],
        'm_releasedate': row[4],
        'm_price': row[5],

    }

    return m_row_dict
def get_row_as_dict3(row):
    row_dict3 = {
        'booking_ID' : row[0],
        'movie_name' : row[1],
        'booking_Date' : row[2],
        'booking_Seats' : row[3],
        'userEmail' : row[4],
        'bookingTime' : row[5],
        'Poster' : row[6],
        'Location' : row[7],
        'Price': row[8],
    }
    return row_dict3

def get_row_as_dict4(row):
    row_dict4 = {
        'email' : row[0],
    }
    return row_dict4

def get_row_as_dict5(row):
    row_dict5 = {
        'member_id' : row[0],
        'name' : row[1],
        'email' : row[2],
        'password' : row[3],
    }
    return row_dict5


def get_row_as_dict6(row):
    row_dict6 = {
        'name' : row[0],
        'location' : row[1],
        'email' : row[2],
        'message' : row[3],
    }
    return row_dict6

def get_locrow_as_dict(row):
    l_row_dict = {
        'loc_id': row[0],
        'loc_name': row[1],
        'loc_long': row[2],
        'loc_lat': row[3],
        'loc_b_hrs': row[4],

    }

    return l_row_dict

app = Flask(__name__)

@app.route('/api/movies', methods=['GET'])
def m_index():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM Movies')
    rows = cursor.fetchall()

    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = get_movierow_as_dict(row)
        rows_as_dict.append(row_as_dict)
    return jsonify(rows_as_dict), 200

@app.route('/api/upcoming', methods=['GET'])
def u_index():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM UpcomingMovies')
    rows = cursor.fetchall()

    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = get_movierow_as_dict(row)
        rows_as_dict.append(row_as_dict)
    return jsonify(rows_as_dict), 200

@app.route('/api/movie/<string:m_id>', methods=['GET'])
def show(m_id):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM Movies WHERE m_id=?', (str(m_id),))
    row = cursor.fetchone()
    db.close()

    if row:
        row_as_dict = get_movierow_as_dict(row)
        return jsonify(row_as_dict), 200
    else:
        return jsonify(None), 200

@app.route('/api/upcoming/<string:m_id>', methods=['GET'])
def ushow(m_id):
  
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM UpcomingMovies WHERE m_id=?', (str(m_id),))
    row = cursor.fetchone()
    db.close()

    if row:
        row_as_dict = get_movierow_as_dict(row)
        return jsonify(row_as_dict), 200
    else:
        return jsonify(None), 200


@app.route('/api/app/<string:movieName>', methods=['GET'])
def index(movieName):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM movie_details where Name=?', (str(movieName),))
    rows = cursor.fetchall()

    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = get_row_as_dict(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200


@app.route('/api/app', methods=['GET'])
def indexxx():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM movie_details')
    rows = cursor.fetchall()

    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = get_row_as_dict(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200


@app.route('/api/app/<string:movieName>/<string:location>', methods=['GET'])
def showwwwww(movieName,location):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM movie_details WHERE Location=? AND Name=?', (str(location),str(movieName),))
    rows = cursor.fetchall()


    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = get_row_as_dict(row)
        rows_as_dict.append(row_as_dict)
    print(type(rows_as_dict))
    print(type(jsonify(rows_as_dict)))
    print(jsonify(rows_as_dict))
    return jsonify(rows_as_dict), 200

@app.route('/api/app/<string:location>/<string:movieName>/<string:Date>', methods=['GET'])
def showww(location,movieName,Date):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM movie_details WHERE Location=? AND Name=? AND Date=?', (str(location),str(movieName),str(Date),))
    rows = cursor.fetchall()

    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = get_row_as_dict(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200   

@app.route('/api/app/<string:location>/<string:movieName>/<string:Date>/<string:Time>', methods=['GET'])
def showwww(location,movieName,Date,Time):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM movie_details WHERE Location=? AND Name=? AND Date=? AND Time=?', (str(location),str(movieName),str(Date),str(Time),))
    row = cursor.fetchone()
    db.close()

    if row:
        row_as_dict = get_row_as_dict(row)
        return jsonify(row_as_dict), 200
    else:
        return jsonify(None), 200

@app.route('/api/insertToBooking', methods=['POST'])
def storeBooking():
    if not request.json:
        abort(404)

    new_member = (
        
        request.json['movie_name'],
        request.json['booking_Date'],
        request.json['booking_Seats'],
        request.json['UserEmail'],
        request.json['bookingTime'],
        request.json['Poster'],
        request.json['Location'],
        request.json['Price']

    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''
        INSERT INTO booking(movie_name,booking_Date,booking_Seats,UserEmail,bookingTime,Poster,Location,Price)
        VALUES(?,?,?,?,?,?,?,?)
    ''', new_member)

    member_id = cursor.lastrowid

    db.commit()

    response = {
        'id': member_id,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201


@app.route('/api/updateMovieDetails', methods=['PUT'])
def updateMovie():
    if not request.json:
        abort(400)

    if 'Name' not in request.json:
        abort(400)


    update_member = (
        request.json['Booked'],
        request.json['Name'],
        request.json['Date'],
        request.json['Time'],
        request.json['Location'],
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''
        UPDATE movie_details SET Booked=?
        WHERE Name=? AND Date=? AND Time=? AND Location=?
    ''', update_member)

    db.commit()

    response = {
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201

@app.route('/api/booking', methods=['GET']) 
def getBooking():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM booking ORDER BY booking_ID')
    rows = cursor.fetchall()

    print(rows)

    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = get_row_as_dict3(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200

@app.route('/api/booking/<int:bookingID>', methods=['DELETE']) 
def deleteBooking(bookingID):
    if not request.json:
        abort(400)

    if 'id' not in request.json:
        abort(400)

    if int(request.json['id']) != bookingID:
        abort(400)

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('DELETE FROM booking WHERE booking_ID=?', (str(bookingID),))

    db.commit()

    response = {
        'id': bookingID,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201

@app.route('/api/userEmail', methods=['GET'])
def getAllEmail():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT email FROM register')
    rows = cursor.fetchall()

    print(rows)

    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = get_row_as_dict4(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200

@app.route('/api/registers/<string:email>', methods=['PUT'])
def update(email):

    update_member = (
        request.json['name'],
        request.json['password'],
        str(email),
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''
        UPDATE register SET
            name=?,password=?
        WHERE email=?
    ''', update_member)

    db.commit()

    response = {
        'id': email,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201

@app.route('/api/enquiries', methods=['POST'])
def storeEnquiries():
    if not request.json:
        abort(404)

    new_enquiry = (
        
        request.json['name'],
        request.json['email'],
        request.json['location'],
        request.json['message'],
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''
        INSERT INTO enquiries(name,location,email,message)
        VALUES(?,?,?,?)
    ''', new_enquiry)

    member_id = cursor.lastrowid

    db.commit()

    response = {
        'id': member_id,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201
    
@app.route('/api/register', methods=['GET'])
def getInfo():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM register')
    rows = cursor.fetchall()

    print(rows)

    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = get_row_as_dict5(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200

@app.route('/api/register', methods=['POST'])
def store():
    if not request.json:
        abort(404)

    new_member = (
        
        request.json['name'],
        request.json['email'],
        request.json['password'],
      
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''
        INSERT INTO register(name,email,password)
        VALUES(?,?,?)
    ''', new_member)

    member_id = cursor.lastrowid

    db.commit()

    response = {
        'id': member_id,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201
    
@app.route('/api/loc', methods=['GET'])
def loc_index():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM Location')
    rows = cursor.fetchall()

    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = get_locrow_as_dict(row)
        rows_as_dict.append(row_as_dict)
    return jsonify(rows_as_dict), 200

if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5000, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    app.run(host='0.0.0.0', port=port)