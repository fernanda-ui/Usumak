function openApp(appName) {
    console.log("Attempting to open app:", appName); 

    fetch("http://127.0.0.1:5000/open_app", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "app_name": appName })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            console.log(data.message);
        } else {
            console.error(data.message);
        }
    })
    .catch(error => console.error("Error:", error));
}




// Menú de inicio 
function toggleStartMenu() {
    const startMenu = document.getElementById("startMenu");

    if (startMenu.classList.contains("show")) {
        startMenu.classList.remove("show");
        setTimeout(() => {
            startMenu.style.visibility = "hidden"; 
        }, 300); 
    } else {
        startMenu.style.visibility = "visible"; 
        setTimeout(() => {
            startMenu.classList.add("show");
        }, 10); 
    }
}

// Cerrar el menú si se hace clic fuera de él
document.addEventListener("click", function(event) {
    const startMenu = document.getElementById("startMenu");
    const startButton = document.getElementById("startButton");

    if (!startMenu.contains(event.target) && !startButton.contains(event.target)) {
        startMenu.classList.remove("show");
        setTimeout(() => {
            startMenu.style.visibility = "hidden"; 
        }, 300); 
    }
});

// Para evitar que el clic en el botón de inicio cierre el menú
document.getElementById("startButton").addEventListener("click", function(event) {
    event.stopPropagation(); 
});


// Función para escribir en el campo de búsqueda
function searchApp() {
    const searchTerm = document.getElementById('searchBox').value.toLowerCase(); // Usamos toLowerCase para hacer la búsqueda sin importar mayúsculas o minúsculas
    
    const apps = document.querySelectorAll('.app');

    apps.forEach(function(app) {
        const appName = app.getAttribute('data-name').toLowerCase(); 
        
        if (appName.includes(searchTerm)) {
            app.style.display = 'block';  
        } else {
            app.style.display = 'none';  
        }
    });
}



// Menú de opciones de apagado
function togglePowerMenu() {
    const powerMenu = document.getElementById("powerMenu");
    powerMenu.style.display = powerMenu.style.display === "block" ? "none" : "block";
}

function powerAction(action) {
    switch (action) {
        case 'bloquear':
            alert("Bloqueando el sistema..."); 
            break;
        case 'suspender':
            alert("Suspendiendo el sistema...");
            break;
        case 'apagar':
            alert("Apagando el sistema...");
            break;
        case 'reiniciar':
            alert("Reiniciando el sistema...");
            break;
    }
    togglePowerMenu();
}

document.addEventListener("click", function(event) {
    const powerMenu = document.getElementById("powerMenu");
    const apagadoIcon = document.querySelector(".apagado img");

    if (!powerMenu.contains(event.target) && event.target !== apagadoIcon) {
        powerMenu.style.display = "none";
    }
});


/////////////////////////////////////////////
//Variables
let contextMenu = document.getElementById("contextMenu");
let folder = document.getElementById("folder");


//Función para eliminar la carpeta
function deleteFolder() {
    folder.remove();
}

//Función para cambiar el nombre de la carpeta
function renameFolder() {
    renameInput.style.display = "block"; 
    renameInput.value = folderName.textContent; 
    folderName.style.display = "none";    
    renameInput.focus();                  
}

// Función para aplicar el nuevo nombre
function applyRename() {
    folderName.textContent = renameInput.value || "Carpeta"; 
    renameInput.style.display = "none";     
    folderName.style.display = "block";    
}

// Función para mover la carpeta
let isDragging = false;
let offsetX, offsetY;

folder.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        folder.style.left = `${e.pageX - offsetX}px`;
        folder.style.top = `${e.pageY - offsetY}px`;
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});


// Función para abrir el menú contextual de la carpeta
function openContextMenu(event) {
    event.preventDefault();
    contextMenu.style.top = `${event.clientY}px`;
    contextMenu.style.left = `${event.clientX}px`;
    contextMenu.style.display = "block";
}



// Cerrar los menús contextuales al hacer clic fuera
document.addEventListener("click", () => {
    contextMenu.style.display = "none";
});

////////////////////////////////////////////////////

// Eliminar una sola notificación
document.querySelectorAll('.close-btn').forEach(button => {
    button.addEventListener('click', () => {
      button.parentElement.remove();
    });
  });

  // Eliminar todas las notificaciones
  document.getElementById('clearAll').addEventListener('click', () => {
    const container = document.querySelector('.notifications-container');
    container.innerHTML = '';
  });


///////////////////////////////////////////////////////

// Mostrar/ocultar la ventana emergente
function togglePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
  }
  
  // Cerrar la ventana emergente al hacer clic fuera de ella
  document.addEventListener('click', function (event) {
    const popup = document.getElementById('popup');
    const datetimeElement = document.getElementById('datetime');
  
    // Si el clic no es en la ventana emergente ni en la hora/fecha, cierra la ventana
    if (popup.style.display === 'block' && !popup.contains(event.target) && event.target !== datetimeElement) {
      popup.style.display = 'none';
    }
  });
  
  // Activar/desactivar controles (WiFi, Bluetooth, Modo avión)
  function toggleControl(element) {
    element.classList.toggle('active');
  }
  
  // Actualizar la hora en la barra de tareas
  function updateTime() {
    const datetimeElement = document.getElementById('datetime');
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = now.toLocaleDateString();
    datetimeElement.textContent = `${time} ${date}`;
  }
  
  setInterval(updateTime, 1000); 
  updateTime(); 
  