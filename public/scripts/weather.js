(function () {

//============================================================
  // this class represents a place that contains its name and coordinates.
  class Place {
    constructor(name, longitude, latitude) {
      this.name = name;
      this.longitude = longitude;
      this.latitude = latitude;
    }
  }

//============================================================
  // this class manages the list of places with a Map database,
  // as well as the DOM representation of the list.
  class PlacesManager {

    constructor() {
      // a Map database to contain all the places.
      this._map = new Map();

      // the select element from the DOM.
      this._select = document.getElementById("select_place");
    }

    get select() {
      return this._select;
    }

    get map() {
      return this._map;
    }

    // add a new place to the list of places.
    addPlace(place) {
      // add to map
      this.map.set(place.name, place);

      // add to the DOM
      const option = document.createElement("option");
      option.innerHTML = `${place.name}`;
      this.select.appendChild(option);
    }

    // remove a place from the list of places.
    removeSelectedPlace() {
      // remove from map
      this.map.delete(this.getSelectedText());

      // remove from DOM
      this.select.remove(this.select.selectedIndex);
      this.selectChanged();
    }

    // manage changes in the select element (add or remove the select buttons).
    selectChanged() {
      if (this.getSelectedText() === "-- Select --") {
        removeVisibility("selection_buttons");
      } else {
        addVisibility("selection_buttons");
      }
    }

    // get the text from the selected option.
    getSelectedText() {
      const result = this.select.options[this.select.selectedIndex].text.trim();
      return result;
    }

    // get the place that the user selected from the selected options.
    getSelectedPlace() {
      return this.map.get(this.getSelectedText());
    }
  }

//============================================================
  // do the web logic after the DOM Content is Loaded.
  document.addEventListener("DOMContentLoaded", () => {

    //creating a PlacesManager instance that manages the list of places.
    const placesManager = new PlacesManager();
    const select = placesManager.select;

    const removeBtn = document.getElementById("remove_btn");
    const displayBtn = document.getElementById("display_btn");
    const addItemForm = document.querySelector("#insert_section form");

    //notify placesManager that select selection has changed.
    select.addEventListener("change", () => {
      placesManager.selectChanged();
    });

    //clicking the remove button will remove the selected place.
    removeBtn.addEventListener("click", () => {
      placesManager.removeSelectedPlace();
    });

    //clicking the display forecast button will display the forecast for the selected place.
    displayBtn.addEventListener("click", () => {
      const place = placesManager.getSelectedPlace();
      displayForecast(place);
    });

    //submitting the add form will add a new place.
    addItemForm.addEventListener("submit", function (event) {
      event.preventDefault();
      addItem(placesManager, addItemForm);
    });
  });


//============================================================
  //displays the @param place forecast image and table
  function displayForecast(place) {
    //show user that the img and table is loading
    addVisibility("loading_img");
    addVisibility("loading_json");

    removeVisibility("img_div");
    getAndDisplayImg(place);
    getAndDisplayJson(place);
  }

//============================================================
  //get the weather in a json format and display it
  function getAndDisplayJson(place) {
    const jsonDiv = document.getElementById("json_div");
    jsonDiv.innerHTML = "";

    const jsonUrl =
      `http://www.7timer.info/bin/api.pl?product=civillight&output=json` +
      `&lon=${place.longitude}&lat=${place.latitude}`;

    fetch(jsonUrl)
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Status Code: ' + response.status);
        }
        return response.json();
      })
      .then(json => {
        displayJson(json);
      })
      .catch(e => {
        const errMsg = 'Looks like there was a problem. ' + e.message;

        const jsonDiv = document.getElementById("json_div");
        jsonDiv.innerHTML = buildAlert(errMsg);
      })
      .finally(() => {
        removeVisibility("loading_json");
      });
  }

//============================================================
  //display the weather info in html table
  function displayJson(json) {
    console.log(json);

    let tableHtml =
      `<table class="table table-striped"> <thead> <tr>
      <th scope="col">#</th>
      <th scope="col">Weather</th>
      <th scope="col">Temperature</th>
      <th scope="col">Wind</th>
    </tr> </thead> <tbody>`

    for (let i = 0; i < json.dataseries.length; i++) {
      const forecast = json.dataseries[i];

      tableHtml += ` <tr> <th scope="row">${i + 1}</th>
            <td>${weatherTranslation(forecast.weather)}</td>
            <td>(Min: ${forecast.temp2m.min}, Max: ${forecast.temp2m.max})</td>
            <td>${forecast.wind10m_max !== 1 ? forecast.wind10m_max : ''}</td> </tr>`
    }
    tableHtml += `</tbody> </table>`

    const jsonDiv = document.getElementById("json_div");
    jsonDiv.innerHTML = tableHtml;
  }

//============================================================
  //get the weather representation in an image format and display it.
  function getAndDisplayImg(place) {
    const imgUrl = `http://www.7timer.info/bin/astro.php` +
      `?ac=0&lang=en&unit=metric&output=internal&tzshift=0` +
      `&lon=${place.longitude}&lat=${place.latitude}`;

    fetch(imgUrl)
      .then(response => response.blob())
      .then(img => {
        const imgLocalUrl = URL.createObjectURL(img);
        displayImg(imgLocalUrl);
      })
      .catch(e => {
        displayImg("./images/weather-def.jpg", true);
      })
      .finally(() => {
        removeVisibility("loading_img");
        addVisibility("img_div");
      });
  }

//============================================================
  //display the src image, if alert is true we add an alert message.
  function displayImg(src, alert = false) {
    const imgTag = `<img src="${src}" alt="weather img">`
    const imgDiv = document.getElementById("img_div");

    if (alert) {
      imgDiv.innerHTML =
        buildAlert("weather forecast image is not available right now, please try again later.");
    } else {
      imgDiv.innerHTML = "";
    }

    imgDiv.innerHTML += imgTag;
  }

//============================================================
  //make the specified element (@param: id) visible.
  function addVisibility(id) {
    const loading = document.getElementById(id);
    loading.classList.remove("d-none");
  }

  //make the specified element (@param: id) invisible.
  function removeVisibility(id) {
    const loading = document.getElementById(id);
    loading.classList.add("d-none");
  }

//============================================================
  // build an html alert message
  function buildAlert(msg) {
    return `<div class="list-group-item-danger p-1 m-1">
    <p>${msg}</p>
  </div>`;
  }

//============================================================
  // translate the weather field to it's full description (if there is any).
  function weatherTranslation(weather) {
    const weatherDict = new Map([["pcloudy", "partly cloudy"],
      ["vcloudy", "very cloudy"], ["ishower", "isolated showers"],
      ["lightrain", "light rain"], ["oshower", "occasional showers"],
    ]);

    if (weatherDict.has(weather)) {
      return weatherDict.get(weather);
    }

    return weather;
  }

//============================================================
  // add item to the list of places
  function addItem(placesManager, addItemForm) {
    const uniqueAlert = document.getElementById("unique_alert");

    // get all required fields to create a new place.
    const name = document.getElementById("place").value.trim();
    const longitude = parseFloat(document.getElementById("longitude").value);
    const latitude = parseFloat(document.getElementById("latitude").value);
    // create a new place.
    const place = new Place(name, longitude, latitude);

    // if the place exist make an error message, else add the place.
    if (placesManager.map.has(place.name)) {
      uniqueAlert.innerHTML = buildAlert("this place is already exist, name must be unique!");
    } else {
      uniqueAlert.innerHTML = "";
      placesManager.addPlace(place);
      addItemForm.reset();
    }
  }

})();