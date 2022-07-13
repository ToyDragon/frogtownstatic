"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_2 = require("react");
function hoverCardHandler(props) {
    var id = (0, react_2.useId)();
    (0, react_2.useEffect)(function () {
        document.getElementsByTagName('body')[0].addEventListener('mousemove', function (e) {
            var hoverCard = document.getElementById(id);
            var idToImageUri = props.loader.getMapDataSync('IDToNormalImageURI');
            if (!hoverCard || !idToImageUri) {
                return;
            }
            var found = false;
            var allElements = document.elementsFromPoint(e.clientX, e.clientY);
            for (var _i = 0, allElements_1 = allElements; _i < allElements_1.length; _i++) {
                var ele = allElements_1[_i];
                var cardId = ele.getAttribute('data-hovercardid');
                if (cardId) {
                    var bg = idToImageUri[cardId];
                    if (bg) {
                        hoverCard.style.top = (e.pageY + 20) + 'px';
                        hoverCard.style.left = e.pageX + 'px';
                        hoverCard.style.backgroundImage = "url(".concat(bg, ")");
                        found = true;
                        break;
                    }
                }
            }
            if (!found) {
                hoverCard.style.top = '-9999999px';
                hoverCard.style.left = '-9999999px';
            }
        });
    }, []);
    return react_1.default.createElement("div", { id: id, style: {
            position: 'fixed',
            width: '223px',
            height: '312px',
            borderRadius: '15px',
            backgroundSize: '100% 100%',
            overflow: 'hidden',
            zIndex: '5',
        } });
}
exports.default = hoverCardHandler;
;
//# sourceMappingURL=hovercard_handler.js.map