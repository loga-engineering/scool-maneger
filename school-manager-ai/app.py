from flask import Flask, request, jsonify
from predict_grade import grade_prediction

app = Flask(__name__)


@app.route('/predict', methods=['POST'])
def predict_grade():
    # Récupérer les données de l'élève depuis la requête POST
    student_data = request.json

    # Effectuer la prédiction de la note en utilisant la fonction grade_prediction
    predicted_grade = grade_prediction(student_data)

    # Renvoyer la prédiction sous forme de réponse JSON
    response = {'predicted_grade': predicted_grade}
    return jsonify(response)

