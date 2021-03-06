const codes = {
    video: '<h1 id="title"><button type="button" class="exit-video" onclick="tv.exitVideo()"><svg viewbox="0 0 100 100"><polyline points="50,30 30,50 50,70 30,50 70,50" /></svg></button><span id="video-title">TITLE</span><div class="share-btn" onclick="tv.loadShareModal(\'VIDEO\', \'TITLE\')"><svg viewbox="0 0 100 100"><polyline points="10,20 90,25 40,90 40,50 90,25 40,50 10,20" /></svg></div></h1><div id="the-video"><video id="the-video_" loop muted autoplay onclick="tv.playOrPause()" src="videos/VIDEO-SD.mp4"></video><svg id="loading" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" fill="none" stroke="#fff" stroke-width="5" r="35" stroke-dasharray="164.93361431346415 56.97787143782138" transform="rotate(6.3252 50 50)"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur=".5s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform></circle></svg><div id="invideo-controls"><button type="button" id="pic-in-pic" class="visible" onclick="tv.requestPiP(\'VIDEO\')"><svg viewbox="0 0 100 100"><rect x="10" y="20" width="80" height="60" rx="5" /><rect x="50" y="50" width="30" height="20" class="fill" /></svg></button><button type="button" id="fullscreen-btn" onclick="tv.requestFS(\'VIDEO\')"><svg viewbox="0 0 100 100"><polyline points="20,40 20,20 40,20" /><polyline points="60,20 80,20 80,40" /><polyline points="80,60 80,80 60,80" /><polyline points="40,80 20,80 20,60" /></svg></button></div></div><div id="controls"><button type="button" id="play-or-pause" class="playing" onclick="tv.playOrPause()"><svg viewbox="0 0 100 100"><rect x="15" y="10" width="27.5" height="80" rx="2" /><rect x="57.5" y="10" width="27.5" height="80" rx="2" /><polyline points="15,10 85,50 15,90 15,15" /></svg></button><button type="button" id="silent-btn" class="muted" onclick="tv.silentBtnOnClick()"><svg viewbox="0 0 100 100"><polyline points="10,30 25,30 50,10 50,90 25,70 10,70 10,30" /><path d="M60 35 A15 15 0 0 1 60,65" /><path d="M60 20 A30 30 0 0 1 60,80" /><line x1="10" x2="90" y1="10" y2="90" /></svg></button><button type="button" id="quality-btn" onclick="tv.videoQualityBtnOnClick(this)" class=""><svg enable-background="new 0 0 32 32" id="Glyph" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M27.526,18.036L27,17.732c-0.626-0.361-1-1.009-1-1.732s0.374-1.371,1-1.732l0.526-0.304  c1.436-0.83,1.927-2.662,1.098-4.098l-1-1.732c-0.827-1.433-2.666-1.925-4.098-1.098L23,7.339c-0.626,0.362-1.375,0.362-2,0  c-0.626-0.362-1-1.009-1-1.732V5c0-1.654-1.346-3-3-3h-2c-1.654,0-3,1.346-3,3v0.608c0,0.723-0.374,1.37-1,1.732  c-0.626,0.361-1.374,0.362-2,0L8.474,7.036C7.042,6.209,5.203,6.701,4.375,8.134l-1,1.732c-0.829,1.436-0.338,3.269,1.098,4.098  L5,14.268C5.626,14.629,6,15.277,6,16s-0.374,1.371-1,1.732l-0.526,0.304c-1.436,0.829-1.927,2.662-1.098,4.098l1,1.732  c0.828,1.433,2.667,1.925,4.098,1.098L9,24.661c0.626-0.363,1.374-0.361,2,0c0.626,0.362,1,1.009,1,1.732V27c0,1.654,1.346,3,3,3h2  c1.654,0,3-1.346,3-3v-0.608c0-0.723,0.374-1.37,1-1.732c0.625-0.361,1.374-0.362,2,0l0.526,0.304  c1.432,0.826,3.271,0.334,4.098-1.098l1-1.732C29.453,20.698,28.962,18.865,27.526,18.036z M16,21c-2.757,0-5-2.243-5-5s2.243-5,5-5  s5,2.243,5,5S18.757,21,16,21z" /></svg><span class="quality sd active" onclick="tv.loadSD(\'VIDEO\')">SD</span><span class="quality hd" onclick="tv.loadHD(\'VIDEO\')">HD</span></button><p id="timer"></p></div>',
    shareModal: '<section class="sub-container"><h1>Share video</h1><a href="http://www.linkedin.com/shareArticle?mini=true&amp;url=https://xnetwork.netlify.com/live-tv?ID" target="_blank"><svg viewbox="0 5 1036 990"><path class="sb-object fill" d="M0 120c0-33.334 11.667-60.834 35-82.5C58.333 15.833 88.667 5 126 5c36.667 0 66.333 10.666 89 32 23.333 22 35 50.666 35 86 0 32-11.333 58.666-34 80-23.333 22-54 33-92 33h-1c-36.667 0-66.333-11-89-33S0 153.333 0 120zm13 875V327h222v668H13zm345 0h222V622c0-23.334 2.667-41.334 8-54 9.333-22.667 23.5-41.834 42.5-57.5 19-15.667 42.833-23.5 71.5-23.5 74.667 0 112 50.333 112 151v357h222V612c0-98.667-23.333-173.5-70-224.5S857.667 311 781 311c-86 0-153 37-201 111v2h-1l1-2v-95H358c1.333 21.333 2 87.666 2 199 0 111.333-.667 267.666-2 469z"/></svg><span>Share on Linkedin</span></a><a href="http://reddit.com/submit?url=https://xnetwork.netlify.com/live-tv?ID&amp;title=TITLE" target="_blank"><svg viewbox="-4.771 0.104 53.521 44.858"><path class="sb-object bg-fill" d="M29.909 35.89c-1.999 1.997-5.218 2.382-7.921 2.382-2.7 0-5.922-.385-7.918-2.382M36.021 4.276L25.899 1.894l-3.93 11.996L25.9 1.894m18.241 3.201a3.99 3.99 0 1 1-7.98 0 3.991 3.991 0 0 1 7.98 0zm.661 23.906c0 8.262-10.263 14.961-22.922 14.961-12.66 0-22.922-6.698-22.922-14.961 0-8.262 10.262-14.961 22.922-14.961 12.659 0 22.922 6.698 22.922 14.961zM-.744 26.676a5.061 5.061 0 0 1-3.027-4.636 5.06 5.06 0 0 1 8.935-3.257m33.568.103a5.061 5.061 0 0 1 9.018 3.154 5.064 5.064 0 0 1-3.23 4.72"/><path class="sb-object" d="M21.879 44.963c-13.191 0-23.922-7.16-23.922-15.961 0-.608.051-1.21.151-1.801a6.066 6.066 0 0 1-2.879-5.161 6.068 6.068 0 0 1 6.06-6.061c1.493 0 2.916.546 4.017 1.522 4.149-2.663 9.73-4.339 15.887-4.455L25.235.71l.882.208.021.005 9.421 2.218A5 5 0 0 1 40.151.105a4.996 4.996 0 0 1 4.99 4.991 4.996 4.996 0 0 1-4.99 4.99 4.995 4.995 0 0 1-4.99-4.984l-8.596-2.024-3.273 9.99c5.933.231 11.291 1.912 15.291 4.517a6.028 6.028 0 0 1 4.108-1.605 6.068 6.068 0 0 1 6.061 6.061 6.019 6.019 0 0 1-3.08 5.28c.087.553.132 1.113.132 1.681-.002 8.801-10.734 15.961-23.925 15.961zM.157 27.11a9.05 9.05 0 0 0-.2 1.892c0 7.699 9.834 13.961 21.922 13.961 12.088 0 21.922-6.263 21.922-13.961 0-.612-.062-1.215-.183-1.807a1.003 1.003 0 0 1-.099-.435c-.669-2.627-2.494-5.012-5.13-6.934a.992.992 0 0 1-.429-.304c-4.007-2.755-9.732-4.482-16.081-4.482-6.285 0-11.961 1.693-15.962 4.401a1.022 1.022 0 0 1-.401.279C2.823 21.643.951 24.044.256 26.694a.992.992 0 0 1-.084.384c-.005.011-.009.022-.015.032zm40.097-8.319c2.319 1.855 4.021 4.064 4.891 6.488a4.033 4.033 0 0 0 1.605-3.239 4.065 4.065 0 0 0-4.061-4.061 4.04 4.04 0 0 0-2.435.812zm-38.965-.812a4.065 4.065 0 0 0-4.06 4.061c0 1.213.54 2.34 1.436 3.1.899-2.405 2.618-4.596 4.946-6.433a4.066 4.066 0 0 0-2.322-.728zM40.15 2.104c-1.648 0-2.99 1.342-2.99 2.991s1.342 2.99 2.99 2.99 2.99-1.341 2.99-2.99-1.341-2.991-2.99-2.991zM21.988 39.271c-4.005 0-6.827-.875-8.626-2.675a1 1 0 0 1 1.415-1.414c1.405 1.405 3.763 2.089 7.211 2.089 3.447 0 5.807-.684 7.214-2.089a.999.999 0 1 1 1.413 1.414c-1.801 1.8-4.622 2.675-8.627 2.675z"/><path class="sb-object fill" d="M30.097 22.35c-2.038 0-3.749 1.707-3.749 3.745 0 2.037 1.711 3.688 3.749 3.688s3.688-1.651 3.688-3.688c0-2.038-1.651-3.745-3.688-3.745zm-16.158 0c-2.036 0-3.745 1.709-3.745 3.745s1.708 3.688 3.745 3.688 3.688-1.652 3.688-3.688-1.652-3.745-3.688-3.745z"/></svg><span>Share on Reddit</span></a><a href="whatsapp://send?text=*TITLE*%0A%0Ahttps://xnetwork.netlify.com/live-tv?ID" data-action="share/whatsapp/share" target="_blank" class="whatsapp"><svg viewbox="0 0 737.509 740.824"><path class="sb-object fill" fill-rule="evenodd" clip-rule="evenodd" d="M630.056 107.658C560.727 38.271 468.525.039 370.294 0 167.891 0 3.16 164.668 3.079 367.072c-.027 64.699 16.883 127.855 49.016 183.523L0 740.824l194.666-51.047c53.634 29.244 114.022 44.656 175.481 44.682h.151c202.382 0 367.128-164.689 367.21-367.094.039-98.088-38.121-190.32-107.452-259.707m-259.758 564.8h-.125c-54.766-.021-108.483-14.729-155.343-42.529l-11.146-6.613-115.516 30.293 30.834-112.592-7.258-11.543c-30.552-48.58-46.689-104.729-46.665-162.379C65.146 198.865 202.065 62 370.419 62c81.521.031 158.154 31.81 215.779 89.482s89.342 134.332 89.311 215.859c-.07 168.242-136.987 305.117-305.211 305.117m167.415-228.514c-9.176-4.591-54.286-26.782-62.697-29.843-8.41-3.061-14.526-4.591-20.644 4.592-6.116 9.182-23.7 29.843-29.054 35.964-5.351 6.122-10.703 6.888-19.879 2.296-9.175-4.591-38.739-14.276-73.786-45.526-27.275-24.32-45.691-54.36-51.043-63.542-5.352-9.183-.569-14.148 4.024-18.72 4.127-4.11 9.175-10.713 13.763-16.07 4.587-5.356 6.116-9.182 9.174-15.303 3.059-6.122 1.53-11.479-.764-16.07-2.294-4.591-20.643-49.739-28.29-68.104-7.447-17.886-15.012-15.466-20.644-15.746-5.346-.266-11.469-.323-17.585-.323-6.117 0-16.057 2.296-24.468 11.478-8.41 9.183-32.112 31.374-32.112 76.521s32.877 88.763 37.465 94.885c4.587 6.122 64.699 98.771 156.741 138.502 21.891 9.45 38.982 15.093 52.307 19.323 21.981 6.979 41.983 5.994 57.793 3.633 17.628-2.633 54.285-22.19 61.932-43.616 7.646-21.426 7.646-39.791 5.352-43.617-2.293-3.826-8.41-6.122-17.585-10.714"/></svg><span>Share on Whatsapp</span></a><a href="https://twitter.com/share?url=https://xnetwork.netlify.com/live-tv?ID&amp;text=TITLE&amp;hashtags=xnetwork" target="_blank"><svg viewbox="-0.25 -0.25 1109.5 901.5"><path d="M741 .2V0h52l19 3.8c12.667 2.467 24.167 5.7 34.5 9.7 10.334 4 20.334 8.667 30 14 9.667 5.333 18.434 10.767 26.301 16.3 7.8 5.467 14.8 11.267 21 17.4C929.933 67.4 939.5 69 952.5 66s27-7.167 42-12.5 29.834-11.333 44.5-18c14.667-6.667 23.601-10.9 26.801-12.7 3.133-1.866 4.8-2.866 5-3l.199-.3 1-.5 1-.5 1-.5 1-.5.2-.3.3-.2.301-.2.199-.3 1-.3 1-.2-.199 1.5-.301 1.5-.5 1.5-.5 1.5-.5 1-.5 1-.5 1.5c-.333 1-.666 2.333-1 4-.333 1.667-3.5 8.333-9.5 20S1051 73 1042 85s-17.066 21.066-24.199 27.2c-7.2 6.2-11.967 10.533-14.301 13-2.333 2.533-5.166 4.866-8.5 7l-5 3.3-1 .5-1 .5-.199.3-.301.2-.3.2-.2.3-1 .5-1 .5-.199.3-.301.2-.3.2-.2.3-.199.3-.301.2-.3.2-.2.3h5l28-6c18.667-4 36.5-8.833 53.5-14.5l27-9 3-1 1.5-.5 1-.5 1-.5 1-.5 1-.5 2-.3 2-.2v2l-.5.2-.5.3-.199.3-.301.2-.3.2-.2.3-.199.3-.301.2-.3.2-.2.3-.199.3-.301.2-.5 1-.5 1-.3.2c-.133.2-4.366 5.866-12.7 17-8.333 11.2-12.833 16.866-13.5 17-.666.2-1.6 1.2-2.8 3-1.133 1.866-8.2 9.3-21.2 22.3s-25.732 24.566-38.199 34.7c-12.533 10.2-18.867 22.733-19 37.6-.2 14.8-.967 31.534-2.301 50.2-1.333 18.667-3.833 38.833-7.5 60.5-3.666 21.667-9.333 46.167-17 73.5-7.666 27.333-17 54-28 80s-22.5 49.333-34.5 70-23 38.167-33 52.5-20.166 27.833-30.5 40.5c-10.333 12.667-23.399 26.934-39.199 42.8-15.867 15.8-24.533 24.467-26 26-1.533 1.467-8.066 6.934-19.601 16.4-11.466 9.533-23.8 19.066-37 28.6-13.133 9.467-25.2 17.367-36.2 23.7s-24.266 13.566-39.8 21.7C630.734 840.4 614 848 596 855s-37 13.5-57 19.5-39.333 10.667-58 14c-18.666 3.333-39.833 6.167-63.5 8.5l-35.5 3.5v.5h-65v-.5l-8.5-.5c-5.666-.333-10.333-.667-14-1-3.666-.333-17.5-2.167-41.5-5.5s-42.833-6.667-56.5-10c-13.666-3.333-34-9.667-61-19s-50.1-18.767-69.3-28.3c-19.133-9.467-31.133-15.467-36-18-4.8-2.467-10.2-5.533-16.2-9.2l-9-5.5-.199-.3-.301-.2-.3-.2-.2-.3-1-.5-1-.5-.199-.3-.301-.2-.3-.2-.2-.3-.199-.3L.5 800H0v-2l1 .2 1 .3 4.5.5c3 .333 11.167.833 24.5 1.5 13.334.667 27.5.667 42.5 0s30.334-2.167 46-4.5c15.667-2.333 34.167-6.333 55.5-12 21.334-5.667 40.934-12.4 58.801-20.2 17.8-7.866 30.466-13.733 38-17.6 7.466-3.8 18.866-10.867 34.199-21.2l23-15.5.2-.3.3-.2.301-.2.199-.3.2-.3.3-.2.301-.2.199-.3 1-.3 1-.2.2-1 .3-1 .301-.2.199-.3-8-.5c-5.333-.333-10.5-.667-15.5-1s-12.833-1.833-23.5-4.5c-10.666-2.667-22.166-6.667-34.5-12-12.333-5.333-24.333-11.667-36-19-11.666-7.333-20.1-13.434-25.3-18.3-5.133-4.801-11.8-11.6-20-20.4-8.133-8.866-15.2-17.967-21.2-27.3s-11.733-20.101-17.199-32.3L124.5 551l-.5-1.5-.5-1.5-.3-1-.2-1 1.5.2 1.5.3 11 1.5c7.334 1 18.834 1.333 34.5 1 15.667-.333 26.5-1 32.5-2s9.667-1.667 11-2l2-.5 2.5-.5 2.5-.5.2-.3.3-.2.301-.2.199-.3-2-.5-2-.5-2-.5-2-.5-2-.5c-1.333-.333-3.666-1-7-2-3.333-1-12.333-4.667-27-11-14.666-6.333-26.333-12.5-35-18.5a241.7 241.7 0 0 1-24.8-19.7c-7.8-7.2-16.366-16.467-25.7-27.8-9.333-11.333-17.666-24.5-25-39.5-7.333-15-12.833-29.333-16.5-43a232.143 232.143 0 0 1-7.199-41.5L43 316l1 .2 1 .3 1 .5 1 .5 1 .5 1 .5 15.5 7c10.334 4.667 23.167 8.667 38.5 12 15.334 3.333 24.5 5.167 27.5 5.5l4.5.5h9l-.199-.3-.301-.2-.3-.2-.2-.3-.199-.3-.301-.2-.3-.2-.2-.3-1-.5-1-.5-.199-.3-.301-.2-.3-.2-.2-.3-1-.5-1-.5-.199-.3c-.2-.134-3.067-2.267-8.601-6.4-5.467-4.2-11.2-9.633-17.2-16.3s-12-13.667-18-21A162.158 162.158 0 0 1 77 271c-4.666-8.333-9.6-18.934-14.8-31.8-5.133-12.8-9.033-25.7-11.7-38.7-2.666-13-4.166-25.833-4.5-38.5-.333-12.667 0-23.5 1-32.5s3-19.167 6-30.5 7.334-23.333 13-36l8.5-19 .5-1.5.5-1.5.301-.2.199-.3.2-.3.3-.2.301.2.199.3.2.3.3.2.301.2.199.3.2.3.3.2.5 1 .5 1 .301.2.199.3 13.5 15c9 10 19.667 21.167 32 33.5 12.334 12.333 19.167 18.733 20.5 19.2 1.334.533 3 2.066 5 4.6 2 2.467 8.667 8.367 20 17.7 11.334 9.333 26.167 20.167 44.5 32.5 18.334 12.333 38.667 24.5 61 36.5 22.334 12 46.334 22.833 72 32.5 25.667 9.667 43.667 16 54 19 10.334 3 28 6.833 53 11.5s43.834 7.667 56.5 9c12.667 1.333 21.334 2.1 26 2.3l7 .2-.199-1.5-.301-1.5-2-12.5c-1.333-8.333-2-20-2-35s1.167-28.833 3.5-41.5c2.334-12.667 5.834-25.5 10.5-38.5 4.667-13 9.234-23.434 13.7-31.3 4.534-7.8 10.467-16.7 17.8-26.7 7.334-10 16.834-20.333 28.5-31 11.667-10.667 25-20.167 40-28.5s28.834-14.667 41.5-19c12.667-4.333 23.334-7.167 32-8.5 8.667-1.333 13-2.1 13-2.3z" class="sb-object fill" stroke-width=".5"/><path d="M0 399V0h741v.2c0 .2-4.333.966-13 2.3-8.666 1.333-19.333 4.167-32 8.5-12.666 4.333-26.5 10.667-41.5 19s-28.333 17.833-40 28.5c-11.666 10.667-21.166 21-28.5 31-7.333 10-13.266 18.9-17.8 26.7-4.466 7.866-9.033 18.3-13.7 31.3-4.666 13-8.166 25.833-10.5 38.5-2.333 12.667-3.5 26.5-3.5 41.5s.667 26.667 2 35l2 12.5.301 1.5.199 1.5-7-.2c-4.666-.2-13.333-.966-26-2.3-12.666-1.333-31.5-4.333-56.5-9s-42.666-8.5-53-11.5c-10.333-3-28.333-9.333-54-19-25.666-9.667-49.666-20.5-72-32.5-22.333-12-42.666-24.167-61-36.5-18.333-12.333-33.166-23.167-44.5-32.5-11.333-9.333-18-15.233-20-17.7-2-2.533-3.666-4.066-5-4.6-1.333-.467-8.166-6.867-20.5-19.2-12.333-12.333-23-23.5-32-33.5L80 44.5l-.199-.3-.301-.2-.5-1-.5-1-.3-.2-.2-.3-.199-.3-.301-.2-.3-.2-.2-.3-.199-.3-.301-.2-.3.2-.2.3-.199.3-.301.2-.5 1.5-.5 1.5L66 63c-5.666 12.667-10 24.667-13 36s-5 21.5-6 30.5-1.333 19.833-1 32.5c.334 12.667 1.834 25.5 4.5 38.5 2.667 13 6.567 25.9 11.7 38.7 5.2 12.866 10.134 23.466 14.8 31.8 4.667 8.333 10 16.167 16 23.5 6 7.333 12 14.333 18 21s11.733 12.1 17.2 16.3c5.533 4.134 8.4 6.267 8.601 6.4l.199.3 1 .5 1 .5.2.3.3.2.301.2.199.3 1 .5 1 .5.2.3.3.2.301.2.199.3.2.3.3.2.301.2.199.3h-9l-4.5-.5c-3-.333-12.166-2.167-27.5-5.5-15.333-3.333-28.166-7.333-38.5-12l-15.5-7-1-.5-1-.5-1-.5-1-.5-1-.3-1-.2 1.801 21c1.133 14 3.533 27.833 7.199 41.5 3.667 13.667 9.167 28 16.5 43 7.334 15 15.667 28.167 25 39.5 9.334 11.333 17.9 20.6 25.7 27.8a241.7 241.7 0 0 0 24.8 19.7c8.667 6 20.334 12.167 35 18.5 14.667 6.333 23.667 10 27 11 3.334 1 5.667 1.667 7 2l2 .5 2 .5 2 .5 2 .5 2 .5-.199.3-.301.2-.3.2-.2.3-2.5.5-2.5.5-2 .5c-1.333.333-5 1-11 2s-16.833 1.667-32.5 2c-15.666.333-27.166 0-34.5-1l-11-1.5-1.5-.3-1.5-.2.2 1 .3 1 .5 1.5.5 1.5 8.301 18.2C138.266 581.399 144 592.167 150 601.5s13.067 18.434 21.2 27.3c8.2 8.801 14.867 15.6 20 20.4 5.2 4.866 13.634 10.967 25.3 18.3 11.667 7.333 23.667 13.667 36 19 12.334 5.333 23.834 9.333 34.5 12 10.667 2.667 18.5 4.167 23.5 4.5s10.167.667 15.5 1l8 .5-.199.3-.301.2-.3 1-.2 1-1 .2-1 .3-.199.3-.301.2-.3.2-.2.3-.199.3-.301.2-.3.2-.2.3-23 15.5c-15.333 10.333-26.733 17.4-34.199 21.2-7.534 3.866-20.2 9.733-38 17.6-17.867 7.8-37.467 14.533-58.801 20.2-21.333 5.667-39.833 9.667-55.5 12-15.666 2.333-31 3.833-46 4.5s-29.166.667-42.5 0c-13.333-.667-21.5-1.167-24.5-1.5l-4.5-.5-1-.3-1-.2V399zM1107.801 109.8l.199-.3.5-.3.5-.2v792H382v-.5l35.5-3.5c23.667-2.333 44.834-5.167 63.5-8.5 18.667-3.333 38-8 58-14s39-12.5 57-19.5 34.734-14.6 50.2-22.8c15.534-8.134 28.8-15.367 39.8-21.7s23.067-14.233 36.2-23.7c13.2-9.533 25.534-19.066 37-28.6 11.534-9.467 18.067-14.934 19.601-16.4 1.467-1.533 10.133-10.2 26-26 15.8-15.866 28.866-30.133 39.199-42.8 10.334-12.667 20.5-26.167 30.5-40.5s21-31.833 33-52.5 23.5-44 34.5-70 20.334-52.667 28-80c7.667-27.333 13.334-51.833 17-73.5 3.667-21.667 6.167-41.833 7.5-60.5 1.334-18.667 2.101-35.4 2.301-50.2.133-14.866 6.467-27.4 19-37.6 12.467-10.134 25.199-21.7 38.199-34.7s20.067-20.434 21.2-22.3c1.2-1.8 2.134-2.8 2.8-3 .667-.134 5.167-5.8 13.5-17 8.334-11.134 12.567-16.8 12.7-17l.3-.2.5-1 .5-1 .301-.2.199-.3.2-.3.3-.2.301-.2.199-.3.2-.3.3-.2.301-.2zM812 3.8L793 0h316v107l-2 .2-2 .3-1 .5-1 .5-1 .5-1 .5-1.5.5-3 1-27 9c-17 5.667-34.833 10.5-53.5 14.5l-28 6h-5l.2-.3.3-.2.301-.2.199-.3.2-.3.3-.2.301-.2.199-.3 1-.5 1-.5.2-.3.3-.2.301-.2.199-.3 1-.5 1-.5 5-3.3c3.334-2.134 6.167-4.467 8.5-7 2.334-2.467 7.101-6.8 14.301-13C1024.933 106.066 1033 97 1042 85s16.5-23.833 22.5-35.5 9.167-18.333 9.5-20c.334-1.667.667-3 1-4l.5-1.5.5-1 .5-1 .5-1.5.5-1.5.301-1.5.199-1.5-1 .2-1 .3-.199.3-.301.2-.3.2-.2.3-1 .5-1 .5-1 .5-1 .5-.199.3c-.2.134-1.867 1.134-5 3-3.2 1.8-12.134 6.034-26.801 12.7-14.666 6.667-29.5 12.667-44.5 18s-29 9.5-42 12.5-22.566 1.4-28.699-4.8c-6.2-6.134-13.2-11.934-21-17.4-7.867-5.533-16.634-10.966-26.301-16.3a245.399 245.399 0 0 0-30-14c-10.333-4-21.833-7.233-34.5-9.7zM0 850.5V800h.5l.301.2.199.3.2.3.3.2.301.2.199.3 1 .5 1 .5.2.3.3.2.301.2.199.3 9 5.5c6 3.667 11.4 6.733 16.2 9.2 4.867 2.533 16.867 8.533 36 18 19.2 9.533 42.3 18.967 69.3 28.3s47.334 15.667 61 19c13.667 3.333 32.5 6.667 56.5 10s37.834 5.167 41.5 5.5c3.667.333 8.334.667 14 1l8.5.5v.5H0v-50.5z" class="sb-object bg-fill" stroke-width=".5"/></svg><span>Share on Twitter</span></a><a href="http://www.facebook.com/sharer.php?u=https://xnetwork.netlify.com/live-tv?ID" target="_blank"><svg viewbox="0 0 266.893 266.895"><path class="sb-object fill" d="M252.164 266.895c8.134 0 14.729-6.596 14.729-14.73V14.73c0-8.137-6.596-14.73-14.729-14.73H14.73C6.593 0 0 6.594 0 14.73v237.434c0 8.135 6.593 14.73 14.73 14.73h237.434z" /><path class="sb-object bg-fill" d="M184.152 266.895V163.539h34.692l5.194-40.28h-39.887V97.542c0-11.662 3.238-19.609 19.962-19.609l21.329-.01V41.897c-3.689-.49-16.351-1.587-31.08-1.587-30.753 0-51.807 18.771-51.807 53.244v29.705h-34.781v40.28h34.781v103.355h41.597z" /></svg><span>Share on Facebook</span></a></section>',
    template: '<div class="video" onclick="tv.watchVideo(\'ID\', \'TITLE\')"><img src="videos/temp/ID.jpg" class="temp" alt="TITLE"><div class="layer"></div><h1 class="video-title"><span class="red-dot"></span>TITLE</h1><button type="button" class="select-video"><svg viewbox="0 0 100 100"><circle r="45" cx="50" cy="50" /><polyline points="40,40 60,50 40,60" /></svg></button></div>',
    rv: '<div class="related-video" onclick="tv.watchVideo(\'ID\', \'TITLE\')"><img src="videos/temp/ID.jpg" class="temp" alt="TITLE"><div class="layer"></div><h1 class="video-title"><span class="red-dot"></span>TITLE</h1><button type="button" class="select-video"><svg viewbox="0 0 100 100"><circle r="45" cx="50" cy="50" /><polyline points="40,40 60,50 40,60" /></svg></button></div>'
};

const videos = [
    {
        id: "space-shuttle-launch",
        title: "Space shuttle launch"
    },
    {
        id: "airplane-landing",
        title: "Airplane landing"
    },
    {
        id: "an-antelope-in-captivity",
        title: "An antelope in captivity"
    },
    {
        id: "cars-passing-by-highway",
        title: "Cars passing by highway"
    },
    {
        id: "space-shuttle-landing",
        title: "Space shuttle landing"
    },
    {
        id: "strong-waves-due-to-typhoon",
        title: "Strong waves due to typhoon"
    },
    {
        id: "flying-rocket",
        title: "Flying rocket"
    },
    {
        id: "airplanes-running-around",
        title: "Airplanes running around"
    },
    {
        id: "air-show-of-fighter-planes",
        title: "Air show of fighter planes"
    },
    {
        id: "a-chirping-bird-perch-on-the-tip-of-a-steel-bar",
        title: "A chirping bird perch on the tip of a steel bar"
    },
    {
        id: "let-it-snow",
        title: "Let it snow"
    },
    {
        id: "penguins-beside-the-water",
        title: "Penguins beside the water"
    },
    {
        id: "rainy-night",
        title: "Rainy night"
    },
    {
        id: "view-from-window-seat",
        title: "View from window seat"
    },
    {
        id: "people-walking-around",
        title: "People walking around"
    }
];

const tv = {
    video: null,
    shareModalLoaded: false,
    fullscreenLoaded: false,
    videoQuality: "SD",
    
    loadTemplate: () => {
        videos.forEach(video => {
            $("#main").append(
                codes.template
                .split("ID")
                .join(video.id)
                .split("TITLE")
                .join(video.title)
            );
        });
    },
    
    loadShareModal: (id, title) => {
        $("#share-modal").html(
            codes.shareModal
            .split("ID")
            .join(id)
            .split("TITLE")
            .join(title)
        );
        
        history.pushState("share", null);
        $("#share-modal").fadeIn(200);
        tv.shareModalLoaded = true;
    },
    hideShareModal: () => {
        history.back();
    },
    exitVideo: () => {
        history.back();
    },
    unmuteVideo: () => {
        $("#silent-btn").removeClass("muted");
        tv.video.muted = false;
    },
    muteVideo: () => {
        $("#silent-btn").addClass("muted");
        tv.video.muted = true;
    },
    silentBtnOnClick: () => {
        if (tv.video.muted){
            tv.unmuteVideo();
        }
        else {
            tv.muteVideo();
        }
    },
    videoQualityBtnOnClick: (el) => {
        const active = $(el).attr("class");
        if (active.includes("active")){
            $(el).removeClass("active");
        }
        else {
            $(el).addClass("active");
        }
    },
    checkVideoBuffering: () => {
        if (tv.video.readyState < tv.video.HAVE_FUTURE_DATA){
            $("#loading").addClass("visible");
        }
        else {
            $("#loading").removeClass("visible");
        }
        
        if (history.state){
            if (history.state.includes("video=") || history.state === "fullscreen" || history.state === "share"){
                setTimeout(tv.checkVideoBuffering, 500);
            }
        }
    },
    checkVideoPaused: () => {
        if (tv.video.paused){
            $("#play-or-pause").attr("class", "paused");
        }
        else {
            $("#play-or-pause").attr("class", "playing");
        }
        
        if (history.state){
            if (history.state.includes("video=") || history.state === "fullscreen" || history.state === "share"){
                setTimeout(tv.checkVideoPaused, 500);
            }
        }
    },
    pauseVideo: () => {
        tv.video.pause();
        $("#play-or-pause").attr("class", "paused");
    },
    playVideo: () => {
        tv.video.play();
        $("#play-or-pause").attr("class", "playing");
        
        tv.checkVideoBuffering();
        tv.checkVideoPaused();
    },
    playOrPause: () => {
        if (tv.video.paused){
            tv.playVideo();
        }
        else {
            tv.pauseVideo();
        }
    },
    randomTime: 0,
    setTimer: (id) => {
        let state = history.state;
        if (!state){
            state = "";
        }
        
        const videoCurTime = Math.floor(tv.video.currentTime);
        if (tv.randomTime === 0){
            tv.randomTime = Math.floor(Math.random() * 1000) + 100;
        }
        let timer = videoCurTime + tv.randomTime;
        let hours = Math.floor((timer / 60) / 60);
        if (hours < 10){
            hours = `0${hours}`;
        }
        let minutes = Math.floor((timer / 60) % 60);
        if (minutes < 10){
            minutes = `0${minutes}`;
        }
        let seconds = Math.floor(timer % 60);
        if (seconds < 10){
            seconds = `0${seconds}`;
        }
        
        $("#timer").html(`<span class="red-dot"></span><span>${hours}</span> : <span>${minutes}</span> : <span>${seconds}</span>`);
        
        if (state.includes(id) || state === "fullscreen" || state === "share"){
            setTimeout(() => {
                tv.setTimer(id);
            }, 100);
        }
    },
    requestPiP: (id) => {
        if (history.state.includes(id)){
            if (tv.video.requestPictureInPicture){
                tv.video.requestPictureInPicture();
            }
            else {
                alert("Sorry, Your browser doesn't support Picture In Picture");
            }
        }
    },
    requestFS: (id) => {
        if (history.state.includes(id)){
            history.pushState("fullscreen", null);
            $("header").addClass("hidden");
            $("#the-video").addClass("fullscreen");
            $("#fullscreen-btn svg").html('<polyline points="20,40 40,40 40,20" /><polyline points="60,20 60,40 80,40" /><polyline points="80,60 60,60 60,80" /><polyline points="40,80 40,60 20,60" />');
            $("#pic-in-pic").removeClass("visible");
            tv.fullscreenLoaded = true;
        }
        else {
            $("#fullscreen-btn svg").html('<polyline points="20,40 20,20 40,20" /><polyline points="60,20 80,20 80,40" /><polyline points="80,60 80,80 60,80" /><polyline points="40,80 20,80 20,60" />');
            $("#pic-in-pic").addClass("visible");
            history.back();
        }
    },
    
    scrollTop: 0,
    watchVideo: (id, title) => {
        $("#video").html("");
        setTimeout(() => {
            let vidID = location.href;
            
            if (!vidID.includes(id)){
                history.pushState(`video=${id}`, null, `/live-tv?${id}`);
            }
            
            $("#player").addClass("visible");
            $("main").removeClass("visible");
            
            tv.randomTime = 0;
            tv.loadVideo(id, title);
        }, 100);
    },
    loadVideo: (id, title) => {
        $("#video").html(
            codes.video
            .split("VIDEO")
            .join(id)
            .split("TITLE")
            .join(title)
        );
        
        tv.video = $("#the-video_").get(0);
        tv.playVideo();
        tv.setTimer(id);
        tv.loadRelatedVideos(id);
        tv.videoQuality = "SD";
        $("#player .sub-container").scrollTop(0);
    },
    loadRelatedVideos: (id) => {
        const data = videos.filter(video => video.id !== id);
        
        $("#related-videos section").html("");
        for (let i = 0; i < 3; i++){
            $("#related-videos section").append(
                codes.rv
                .split("ID")
                .join(data[i].id)
                .split("TITLE")
                .join(data[i].title)
            );
        }
    },
    loadSD: (id) => {
        $(".quality").removeClass("active");
        $(".sd").addClass("active");
        
        if (tv.videoQuality === "HD"){
            const curTime = tv.video.currentTime;
            $("#the-video_").attr("src", `videos/${id}-SD.mp4`);
            tv.video.currentTime = curTime;
            
            tv.videoQuality = "SD";
        }
    },
    loadHD: (id) => {
        $(".quality").removeClass("active");
        $(".hd").addClass("active");
        
        if (tv.videoQuality === "SD"){
            const curTime = tv.video.currentTime;
            $("#the-video_").attr("src", `videos/${id}-HD.mp4`);
            tv.video.currentTime = curTime;
            
            tv.videoQuality = "HD";
        }
    },
    
    watchVideoOnPageLoad: () => {
        const href = location.href;
        let id = "";
        
        if (href.includes("?")){
            id = href.substr(href.lastIndexOf("?")+1, href.length);
            
            const video = videos.filter(vid => vid.id === id);
            
            if (video.length > 0){
                tv.watchVideo(video[0].id, video[0].title);
            }
        }
    },
    
    fullscreenOnFKey: (e) => {
        e.preventDefault();
        let state = history.state;
        if (!state){
            state = "";
        }
        
        if (state.includes("video=") || state === "fullscreen"){
            if (e.keyCode === 70){
                $("#fullscreen-btn").click();
            }
            else if (e.keyCode === 32){
                $("#play-or-pause").click();
            }
        }
    },
    
    onPopState: () => {
        let state = history.state;
        if (!state){
            state = "";
        }
        
        if (state !== "share"){
            $("#share-modal").fadeOut(200);
            
            if (state.includes("video=")){
                if (!tv.shareModalLoaded && !tv.fullscreenLoaded){
                    const id = history.state.split("video=").join("");
                    let title = "";
                    for (let i = 0; i < videos.length; i++){
                        if (videos[i].id === id){
                            title = videos[i].title;
                        }
                    }
                    tv.watchVideo(id, title);
                }
            }
            else if (!state.includes("video=")){
                $("#player").removeClass("visible");
                $("main").addClass("visible");
                $(window).scrollTop(tv.scrollTop);
                tv.pauseVideo();
            }
            
            tv.shareModalLoaded = false;
            tv.fullscreenLoaded = false;
        }
        else {
            history.back();
        }
        
        if (!state.includes("fullscreen")){
            $("header").removeClass("hidden");
            $("#the-video").removeClass("fullscreen");
        }
        
    }
}

tv.loadTemplate();
$(window)
.on("load", tv.watchVideoOnPageLoad)
.on("popstate", tv.onPopState)
.on("keyup", tv.fullscreenOnFKey);