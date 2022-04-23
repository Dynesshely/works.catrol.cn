(function(){

  var app = angular.module('notesApp',['angular-markdown-editable']);
  
  app.controller('notesController', function($scope){
    
    // Initial Data
  	$scope.notes = [{
      createdOn:1428237500771,
      edit:false,
      text:"#Hello, World!\n\nThis is your first Angular Markdown note. You can:\n\n* Click/Focus to edit\n\n* Click off/Blur to save\n\n* Add a new note  by clicking the plus sign above.\n\n* Delete this note\n\nMarkdown compiled using the fantastic [angular-markdown-editable](http://projects.quiver.is/angular-markdown-editable/) directive."
    }];
    
    // Add New Note
    $scope.addNote = function(){
      $scope.newNote = {};
      $scope.newNote.createdOn = Date.now();
      $scope.newNote.text = ' ';
      $scope.newNote.edit = true;
      $scope.notes.push($scope.newNote);
      $scope.newNote = {};
    };
    
    // Delete Note
    $scope.delete = function (i) {
      var r = confirm("Are you sure you want to delete this note?");
      if (r == true) 
        $scope.notes.splice(i, 1);
		};
    
    // Update Note
    $scope.update = function(i, note) {
      $scope.notes[i].text = note;
      $scope.notes[i].edit = false;
    };
  
  // End Controller
  });
  
// End Function  
})();