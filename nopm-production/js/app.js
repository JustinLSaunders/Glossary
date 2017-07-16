var sheetKey = "1DB1Zv0wrkve8O4b261oV_aOps4pr6Ovvw4WVcb-pbeg";

function loadArray(){
  var container = document.getElementById("container");
  var getOldList = document.getElementById("terms");

  if (getOldList != null) {
    var oldList = document.getElementById("terms");
    container.removeChild(oldList);
  };

  var termsDiv = document.createElement("div");
  container.appendChild(termsDiv);
  termsDiv.setAttribute("id", "terms");

  var glossaryList = document.createElement("dl");
  termsDiv.appendChild(glossaryList);
  glossaryList.setAttribute("id", "glossary-list");

  var localArray = [];
  var tempArray = [];

  $.ajax({
    url:"https://spreadsheets.google.com/feeds/list/" + sheetKey + "/1/public/values?alt=json",
    success: function sort(data){

      localArray.push(data.feed.entry);

      for (i = 0; i <= localArray[0].length - 1; i++){
        var obj = {};
        obj["term"] = localArray[0][i].gsx$termconcept.$t;
        obj["definition"] = localArray[0][i].gsx$definitiondiscussion.$t;
        tempArray.push(obj);
      }

      var sortedArray = _.sortBy(tempArray, "term");

      for (i = 0; i <= sortedArray.length - 1; i++){
        var termText = sortedArray[i].term;
        var defText = sortedArray[i].definition;
        dlCreation(termText, defText);
      };

      function dlCreation(term, definition){

        var docTerm = document.createElement("dt");
        var docDef = document.createElement("dd");
        var dtFill = document.createTextNode(term);
        var ddFill = document.createTextNode(definition);

        glossaryList.appendChild(docTerm);
        docTerm.appendChild(dtFill);
        glossaryList.appendChild(docDef);
        docDef.appendChild(ddFill);
      }
    }
  });
}

window.onload = loadArray();
buttonAction("#refresh");

function buttonAction(buttonId) {
    $(buttonId).click(function(event){
        event.preventDefault();
        loadArray();
    });

    $(buttonId).mouseenter(function (event) {
        event.preventDefault();
        $(this).css({"background": "#002856", "border": "1px solid #002856", "box-shadow": "2px 2px 3px #666"});
    });

    $(buttonId).mousedown(function (event) {
        event.preventDefault();
        $(this).css("box-shadow", "none");
    });

    $(buttonId).mouseup(function (event) {
        event.preventDefault();
        $(this).css({"box-shadow": "2px 2px 3px #666"});
    });

    $(buttonId).mouseleave(function (event) {
        event.preventDefault();
        if ($(this).is(":focus")) {
            $(this).css({"background": "#002856", "border": "1px solid #002856", "box-shadow": "2px 2px 3px #666"});
        }
        else {
            $(this).css({"background": "#666", "color": "#fff", "border": "1px solid #666", "box-shadow": "none"});
        }
    });

    $(buttonId).focusin(function (event) {
      event.preventDefault()
        $(this).css({"background": "#002856", "border": "1px solid #002856", "box-shadow": "2px 2px 3px #666"});

        $(this).keydown(function () {
            $(this).css("box-shadow", "none");
        });

        $(this).keyup(function () {
            $(this).css({"box-shadow": "2px 2px 3px #666"});
        });

        $(this).mousedown(function (event) {
            event.preventDefault();
            $(this).css("box-shadow", "none");
        });

        $(this).mouseup(function (event) {
            event.preventDefault();
            $(this).css({"box-shadow": "2px 2px 3px #666"});
        });

    });

    $(buttonId).focusout(function (event) {
        event.preventDefault();
        if ($(this).is(":hover")) {
            $(this).css({"background": "#002856", "border": "1px solid #002856", "box-shadow": "2px 2px 3px #666"});
        }
        else {
            $(this).css({"background": "#666", "color": "#fff", "border": "1px solid #666", "box-shadow": "none"});
        }
    });
}