from app import app


# Exemple d'élève à tester
student = {
    'school': 'GP',
    'sex': 'F',
    'age': 16,
    'address': 'U',
    'famsize': 'GT3',
    'Pstatus': 'T',
    'Medu': 3,
    'Fedu': 2,
    'Mjob': 'services',
    'Fjob': 'teacher',
    'reason': 'home',
    'guardian': 'mother',
    'traveltime': 1,
    'studytime': 3,
    'failures': 0,
    'schoolsup': 'no',
    'famsup': 'yes',
    'paid': 'yes',
    'activities': 'yes',
    'nursery': 'yes',
    'higher': 'yes',
    'internet': 'yes',
    'romantic': 'no',
    'famrel': 4,
    'freetime': 3,
    'goout': 2,
    'Dalc': 1,
    'Walc': 1,
    'health': 4,
    'absences': 4,
    'G1': 12,
    'G2': 15
}


if __name__ == '__main__':
    app.run(debug=True)




