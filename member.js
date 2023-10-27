function skillsMembers() {
  return {
    restrict: 'E',
    templateUrl: 'templates/skills/views/members.html',
    controller: 'SkillsMembersController',
    controllerAs: 'vm',
    bindToController: true,
    scope: {
      members: '='
    }
  };
}