import moment from 'moment';
import { padStart, round } from 'lodash';

export const formatVideoTime = (seconds, showms = true) => {
  try {
    const duration = moment.duration(seconds, 's');
    const ms = showms ? `,${padStart(round(duration.milliseconds(), 0), 3, '0')}` : '';
    return `${duration.hours()}:${padStart(duration.minutes(), 2, '0')}:${padStart(duration.seconds(), 2, '0')}${ms}`
  } catch (err) {
    console.error('err in formatvideoTime', err);
  }
}

//http://www.scottklarr.com/topic/425/how-to-insert-text-into-a-textarea-where-the-cursor-is/
export const insertAtCaret = (areaId, text) => {
  var txtarea = document.getElementById(areaId);
  var scrollPos = txtarea.scrollTop;
  var strPos = 0;
  var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
    "ff" : (document.selection ? "ie" : false));
  if (br == "ie") {
    txtarea.focus();
    var range = document.selection.createRange();
    range.moveStart('character', -txtarea.value.length);
    strPos = range.text.length;
  }
  else if (br == "ff") strPos = txtarea.selectionStart;

  var front = (txtarea.value).substring(0, strPos);
  var back = (txtarea.value).substring(strPos, txtarea.value.length);
  txtarea.value = front + text + back;
  strPos = strPos + text.length;
  if (br == "ie") {
    txtarea.focus();
    var range = document.selection.createRange();
    range.moveStart('character', -txtarea.value.length);
    range.moveStart('character', strPos);
    range.moveEnd('character', 0);
    range.select();
  }
  else if (br == "ff") {
    txtarea.selectionStart = strPos;
    txtarea.selectionEnd = strPos;
    txtarea.focus();
  }
}