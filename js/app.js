var glossaryArray = [];
var container = document.getElementById("container");
var sheetKey = "1sUHEIaLnJp3BFMh_HgsZQc_-aHMLPG5fvw9QXQu2IQs";

window.onload = loadArray();

$("button").on("click", localArray());

function loadArray(){
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
      var button = document.getElementById("refresh");

      localArray.push(data.feed.entry);

      var forRun = localArray[0].length - 1;

      for (i = 0; i <= forRun; i++){
        var obj = {};
        obj["term"] = localArray[0][i].gsx$termconcept.$t;
        obj["definition"] = localArray[0][i].gsx$definitiondiscussion.$t;
        tempArray.push(obj);
      };

      var sortedArray = _.sortBy(tempArray, "term");
      var forRun = sortedArray.length - 1;

      for (i = 0; i <= forRun; i++){
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
      };
    } 
  });
};

  // var sheetKey = "1dGm9AnVIvpSMaUsIEiK6CO8UG6_mr2uwL7bFSQQNP_o"; //This is the protected sheet's ID. Figure out a way around "XMLHttpRequest cannot load https://accounts.google.com/ServiceLogin?service=wise&passive=1209600&conti…pSMaUsIEiK6CO8UG6_mr2uwL7bFSQQNP_o/1/public/values?alt%3Djson&ltmpl=sheets. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access."