from flask import Flask, jsonify, request
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app) 

# Lista de rutas para cada aplicación (solo cambiar lo que esta dentro de las comillas)
apps = {
    "word": "C:/Program Files/Microsoft Office/root/Office16/WINWORD.EXE",
    "excel": "C:/Program Files/Microsoft Office/root/Office16/EXCEL.EXE",
    "power": "C:/Program Files/Microsoft Office/root/Office16/POWERPNT.EXE",
    "chrome": "C:\Program Files\Google\Chrome\Application\chrome.exe",
    "edge": "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    "explorer": "explorer.exe",
    "onedrive": "C:\Program Files\Microsoft OneDrive\OneDrive.exe",
    "visual": r"C:\Users\luisa\AppData\Local\Programs\Microsoft VS Code\Code.exe",
    "papelera": r"explorer.exe shell:::{645FF040-5081-101B-9F08-00AA002F954E}",

}


@app.route('/open_app', methods=['POST'])
def open_app():
    data = request.json
    app_name = data.get("app_name")
    app_path = apps.get(app_name)

    if app_path:
        try:
            subprocess.Popen(app_path, shell=True) 
            return jsonify({"status": "success", "message": f"{app_name} opened"})
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500
    else:
        return jsonify({"status": "error", "message": "App not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
