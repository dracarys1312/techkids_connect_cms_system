angular.module('jobCtrl', ['jobService'])
    .controller('jobController', function(Job) {
        var vm = this;
        vm.processing = true;
        // see more ======================
        vm.numLimit = 80;
        vm.readMore = function() {
            vm.numLimit = 3000;
        };
        // //========== testing ===============
        // vm.totalItems = 50;
        // vm.currentPage = 1;
        // vm.alerts = [{
        //     type: 'danger',
        //     msg: 'Oh snap! Change a few things up and try submitting again.'
        // }, {
        //     type: 'success',
        //     msg: 'Well done! You successfully read this important alert message.'
        // }];
        //
        // vm.addAlert = function() {
        //     vm.alerts.push({
        //         msg: 'Another alert!'
        //     });
        // };
        //
        // vm.closeAlert = function(index) {
        //     vm.alerts.splice(index, 1);
        // };

        Job.all()
            .success(function(data) {
                vm.processing = false;
                vm.jobs = data.company;
            });
        vm.deleteJob = function(id) {
            vm.processing = true;
            Job.delete(id)
                .success(function(data) {
                    Job.all()
                        .success(function(data) {
                            vm.processing = false;
                            vm.jobs = data.company;
                        });

                });
        };
    })
    .controller('jobCreateController', function(Job) {
        var vm = this;
        vm.type = 'create';
        vm.selectedField = {};
        vm.jobData = {
            answer_fields: []
        };

        vm.getTemplate = function(field) {
            if (field.id === vm.selectedField.id) return 'edit';
            else return 'display';
        };

        vm.addField = function() {
            var newField = {
                id: (vm.jobData.answer_fields.length + 1),
                field: ''
            };
            vm.jobData.answer_fields.push(newField);
            vm.selectedField = angular.copy(newField);
        };

        vm.editField = function(field) {
            vm.selectedField = angular.copy(field);
        };

        vm.deleteField = function(field) {
            if (confirm("Delete this Field?")) {
                for (var i = 0; i < vm.jobData.answer_fields.length; i++) {
                    if (vm.jobData.answer_fields[i].id === field.id) {
                        vm.jobData.answer_fields.splice(i, 1);
                    }
                }
            }
        };

        vm.saveColor = function(idx) {
            vm.jobData.answer_fields[idx] = angular.copy(vm.selectedField);
            vm.reset();
        };

        vm.reset = function() {
            vm.selectedField = {};
        };

        vm.saveJob = function() {
            vm.processing = true;
            vm.message = '';
            Job.create(vm.jobData)
                .success(function(data) {
                    vm.processing = false;
                    vm.jobData = {};
                    vm.message = data.message;
                });
        };
    })
    .controller('jobEditController', function($routeParams, Job) {
        var vm = this;
        vm.type = 'edit';
        vm.jobData = {
            answer_fields: []
        };
        vm.selectedField = {};
        Job.get($routeParams.job_id)
            .success(function(data) {
                vm.jobData = data;
            });
        vm.getTemplate = function(field) {
            if (field.id === vm.selectedField.id) return 'edit';
            else return 'display';
        };

        vm.addField = function() {
            var newField = {
                id: (vm.jobData.answer_fields.length + 1),
                field: ''
            };
            vm.jobData.answer_fields.push(newField);
            vm.selectedField = angular.copy(newField);
        };

        vm.editField = function(field) {
            vm.selectedField = angular.copy(field);
        };

        vm.deleteField = function(field) {
            if (confirm("Delete this Field?")) {
                for (var i = 0; i < vm.jobData.answer_fields.length; i++) {
                    if (vm.jobData.answer_fields[i].id === field.id) {
                        vm.jobData.answer_fields.splice(i, 1);
                    }
                }
            }
        };

        vm.saveColor = function(idx) {
            vm.jobData.answer_fields[idx] = angular.copy(vm.selectedField);
            vm.reset();
        };

        vm.reset = function() {
            vm.selectedField = {};
        };
        vm.saveJob = function() {
            vm.processing = true;
            vm.message = '';
            Job.update($routeParams.job_id, vm.jobData)
                .success(function(data) {
                    vm.processing = false;
                    vm.jobData = {};
                    vm.message = data.message;
                });
        };
    })
    // .controller('shitController', function(Job) {
    //     var vm = this;
    //     vm.linhtinh = "dkm";
    //     vm.numLimit = 20;
    //     vm.myString = "sdsadsdsdsaldkjslkdsaklds dsalkdjsakdsaj djasldj dsakljd dasjlkds jdasldjsl ";
    //     vm.readMore = function() {
    //         vm.numLimit = 300;
    //     };
    // })
    .controller('paginationController', function(Job) {
        var vm = this;
        Job.all()
            .success(function(data) {
                vm.processing = false;
                vm.jobs = data.company;
                // pagination
                vm.totalItems = vm.company.length;
                console.log(vm.totalItems);
                vm.currentPage = 2;
                vm.pageChanged = function() {
                    $log.log('Page changed to: ' + $scope.currentPage);
                };
            });

    }).controller('TodoController', function($scope) {
        $scope.filteredTodos = [], $scope.currentPage = 1, $scope.numPerPage = 10, $scope.maxSize = 5;
        $scope.makeTodos = function() {
            $scope.todos = [];
            for (i = 1; i <= 1000; i++) {
                $scope.todos.push({
                    text: 'todo ' + i,
                    done: false
                });
            }
        };
        $scope.makeTodos();

        $scope.$watch('currentPage + numPerPage', function() {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage),
                end = begin + $scope.numPerPage;

            $scope.filteredTodos = $scope.todos.slice(begin, end);
        });
    });
