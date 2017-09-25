/* Usage */
/* 
<div class="modal-header">
    some header
</div>
<div class="modal-body">
    <form name="someForm" method="post" novalidate="">
        <fieldset>
            <textarea name="answerField" placeholder="Enter text..."  element-focus="true" ng-model="model.text"></textarea>
        </fieldset>
    </form>
</div>
<div class="modal-footer">
    some footer
</div>
 */
(function() {
	"use strict";
	app.directive('elementFocus', function($timeout) {
		return {
			scope: {
				trigger: '@elementFocus'
			},
			link: function(scope, element) {
				scope.$watch('trigger', function(value) {
					if (value === "true") {
						$timeout(function() {
							element[0].focus();
						});
					}
				});
			}
		};
	});
})();