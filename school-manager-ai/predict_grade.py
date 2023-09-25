import joblib
import pandas as pd
import json


def grade_prediction(student):
    # Charger le modèle préalablement sauvegardé
    prediction_model = joblib.load("models/performance_prediction.joblib")

    # Charger la liste des colonnes utilisées lors de l'entraînement à partir du fichier JSON
    with open('models/columns.json', 'r') as f:
        columns = json.load(f)

    # Prétraitement des données de l'élève
    # Convertir les données en un DataFrame
    student_df = pd.DataFrame(student, index=[0])

    # Convertir les variables catégorielles en variables indicatrices
    student_df = pd.get_dummies(student_df)

    # Utilisez les mêmes colonnes que celles utilisées lors de l'entraînement du modèle
    student_df = student_df.reindex(columns=columns, fill_value=0)

    # Effectuer la prédiction sur l'élève avec le modèle chargé
    predicted_grade = prediction_model.predict(student_df)

    # Mapper la classe prédite à la plage de notes correspondante
    def class_to_grade(class_label):
        if class_label == 0:
            return 'Echec (0-9)'
        elif class_label == 1:
            return 'Passable (10-11)'
        elif class_label == 2:
            return 'Assez Bien (12-13)'
        elif class_label == 3:
            return 'Bien (14-15)'
        else:
            return 'Très Bien/Excellent (16-20)'

    # Retourner la valeur prédite par le modèle
    return class_to_grade(predicted_grade[0])
