(function(){
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/serviceworker.js').then(function(registration) {
          console.log('ServiceWorker registration successful!');
        }).catch(function(err) {
          console.log('ServiceWorker registration failed: ', err);
        });
    }

    // Random color grid-items

    const GRID_ITEMS = document.getElementsByClassName("grid-item");

    function getRandomBackground() {
        let hex = Math.floor(Math.random() * 0xFFFFFF);
        return "#" + ("000000" + hex.toString(16)).substr(-6);
    }

    function changeItemsBackground() {
        for (let item of GRID_ITEMS) {
            item.style.backgroundColor = getRandomBackground();
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        changeItemsBackground();
    });

    // Expand grid options menu

    const OPTIONS_BUTTON = document.getElementById("optionsButton");
    const OPTIONS_BOX = document.getElementById("options-box");

    OPTIONS_BUTTON.addEventListener("click", () => {
        OPTIONS_BOX.classList.toggle("grid-options--expanded");
    });

    // Change grid properties using provided values from inputs

    const GRID = document.getElementById("grid");
    const GRID_WIDTH = document.getElementById("gridWidth");
    const GRID_HEIGHT = document.getElementById("gridHeight");
    const GRID_COLUMNS = document.getElementById("gridColumns");
    const GRID_ROWS = document.getElementById("gridRows");
    const COLUMN_GAP = document.getElementById("gridColumnGap");
    const ROW_GAP = document.getElementById("gridRowGap");
    const AUTOFLOW = document.getElementById("gridAutoFlow");

    GRID_HEIGHT.addEventListener("change", () => {
        GRID.style.height = GRID_HEIGHT.value;
    });

    GRID_WIDTH.addEventListener("change", () => {
        GRID.style.width = GRID_WIDTH.value;
    });

    GRID_COLUMNS.addEventListener("change", () => {
        let columnsNumber = GRID_COLUMNS.value;
        GRID.style.gridTemplateColumns = `repeat(${columnsNumber}, 1fr)`;
    });

    GRID_ROWS.addEventListener("change", () => {
        let rowsNumber = GRID_ROWS.value;
        GRID.style.gridTemplateRows = `repeat(${rowsNumber}, 1fr)`;
    });

    COLUMN_GAP.addEventListener("change", () => {
        let columnGap = COLUMN_GAP.value;
        GRID.style.gridColumnGap = `${columnGap}`;
    });

    ROW_GAP.addEventListener("change", () => {
        let rowGap = ROW_GAP.value;
        GRID.style.gridRowGap = `${rowGap}`;
    });

    AUTOFLOW.addEventListener("change", () => {
        let autoFlow = AUTOFLOW.value;
        GRID.style.gridAutoFlow = `${autoFlow}`;
    });

    // Add a new grid item

    const ADD_ITEM = document.getElementById("addGridItem");

    ADD_ITEM.addEventListener("click", () => {
        let newItem = document.createElement("div");
        let deleteButton = document.createElement("button");
        let deleteIcon = document.createElement("span");
        let formElement = document.createElement("form");
        function createLabel (className, textContent) {
            let labelElement = document.createElement("label");
            labelElement.classList.add("grid-item__label");
            labelElement.classList.add(className);
            labelElement.innerText = textContent + ": ";
            formElement.appendChild(labelElement);
        };
        function createFormInput (className, classNameSpecific) {
            let inputElement = document.createElement("input");
            inputElement.classList.add("grid-item__input");
            inputElement.classList.add(className);
            newItem.childNodes.appendChild(inputElement);
        };
        deleteIcon.classList.add("icon-cancel");
        deleteButton.classList.add("grid-item__button");
        deleteButton.classList.add("grid-item__button--delete");
        newItem.classList.add("grid-item");
        formElement.classList.add("grid-item__options");
        deleteButton.innerText = "Delete";
        deleteButton.appendChild(deleteIcon);
        newItem.appendChild(deleteButton);
        newItem.style.backgroundColor = getRandomBackground();
        createLabel("grid-item__label--column-start", "grid-column-start");
        createLabel("grid-item__label--column-end", "grid-column-end");
        createLabel("grid-item__label--row-start", "grid-row-start");
        createLabel("grid-item__label--row-end", "grid-row-end");
        newItem.appendChild(formElement);
        newItem.addEventListener("click", (event) => {
            event.target.parentNode.remove();
        })
        GRID.appendChild(newItem);
    });

    // Remove selected grid item

    const REMOVE_ITEM = document.getElementsByClassName("grid-item__button--delete");

    for (let item of REMOVE_ITEM) {
        item.addEventListener("click", (event) => {
            event.target.parentNode.remove();
        });
    };

    // Change grid item properties

    const GRID_COLUMN_START = document.getElementsByClassName("gridColumnStart")
    const GRID_COLUMN_END = document.getElementsByClassName("gridColumnEnd")
    const GRID_ROW_START = document.getElementsByClassName("gridRowStart")
    const GRID_ROW_END = document.getElementsByClassName("gridRowEnd")

    for (let item of GRID_COLUMN_START) {
        item.addEventListener("change", (event) => {
            let gridOptionValue = event.target.value;
            event.target.parentNode.parentNode.parentNode.style.gridColumnStart = `${gridOptionValue}`;
        });
    }

    for (let item of GRID_COLUMN_END) {
        item.addEventListener("change", (event) => {
            let gridOptionValue = event.target.value;
            event.target.parentNode.parentNode.parentNode.style.gridColumnEnd = `${gridOptionValue}`;
        });
    }

    for (let item of GRID_ROW_START) {
        item.addEventListener("change", (event) => {
            let gridOptionValue = event.target.value;
            event.target.parentNode.parentNode.parentNode.style.gridRowStart = `${gridOptionValue}`;
        });
    }

    for (let item of GRID_ROW_END) {
        item.addEventListener("change", (event) => {
            let gridOptionValue = event.target.value;
            event.target.parentNode.parentNode.parentNode.style.gridRowEnd = `${gridOptionValue}`;
        });
    }

    // Show the help modal

    const HELP_BUTTON = document.getElementById("showHelp");
    const HELP_MODAL = document.getElementById("helpModal");
    const CLOSE_MODAL = document.getElementById("closeModal");
    
    
    HELP_BUTTON.addEventListener("click", () => {
        HELP_MODAL.classList.add("grid-options__help-box--visible");
    })

    CLOSE_MODAL.addEventListener("click", () => {
        HELP_MODAL.classList.remove("grid-options__help-box--visible");
    })

    /*
    // Show grid item options

    const ITEM__OPTIONS = document.getElementsByClassName("grid-item__button--edit");

    for (let item of ITEM__OPTIONS) {
        item.addEventListener("click", (event) => {
            let formElement = event.target.nextElementSibling;
            formElement.classList.add("grid-item__options--expanded");
        });
    };
    */

    /*
    // Close grid item options

    const ITEM__OPTIONS_CLOSE = document.getElementsByClassName("grid-item__button--cancel-inner");
    
    for (let item of ITEM__OPTIONS_CLOSE) {
        item.addEventListener("click", (event) => {
            e.preventDefault();
            e.stopPropagation();
            let formElement = event.target.parentNode;
            formElement.classList.remove("grid-item__options--expanded");
            console.log(formElement);
        });
    };
    */
    
})();