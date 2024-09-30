// // In order for Pins to display properly, you will need the Masonry plugin by David DeSandro. 

// // Your Pinterest Username
// var pinUser = 'mheowing';

// // Number of Pins you wish to display within the widget
// var numPins = '20';

// // ----------------------------------

// var $pinProfile = $('.pin-user-profile');
// var $pinFeed = $('.pinterest-feed');
// var $pinLink = $('.pinterest-link');

// $.ajax({
//     dataType: 'jsonp',
//     type: 'GET',
//     url: 'https://widgets.pinterest.com/v3/pidgets/users/' + pinUser + '/pins'
// }).done(function (response) {
//     var userinfo = response.data.user;
//     var profileImg = userinfo.image_small_url;
//     var displayName = userinfo.full_name;
//     var userBio = userinfo.about;


//     var pins = response.data.pins;
//     var html = '';
//     for (var i = 0; i < numPins; i++) {
//         var imageUrl = pins[i].images['237x'].url;
//         var pinUrl = pins[i].id;

//         html += '<div class="pinterest-feed-pin"><a href="https://pinterest.com/pin/url/' + pinUrl + '" target="_blank" rel="nofollow" </a><img src="' + imageUrl + '" alt="Pin Feed"></div>';
//     }

//     var userLink = userinfo.profile_url;

//     $pinProfile.html('<img src="' + profileImg + '" alt="" class="pin-user-profile-image"><div class="pin-user-details"><span class="pin-user-name">' + displayName + '</span><span class="pin-user-bio">' + userBio + '</span></div>');

//     $pinLink.html('<a href="' + userLink + '" rel="nofollow" target="_blank"><i class="fab fa-pinterest" style="display:inline-block; margin-right:5px; font-size:20px; line-height:20px; vertical-align:text-top;""></i><span style="display:inline-block; line-height:20px; font-size:12px; vertical-align:text-top;">Follow @' + pinUser + ' on Pinterest</span></a>');

//     $pinFeed.html(html);
// }).fail(function () {
//     console.log('Uh oh');
// });

// $(window).load(function () {
//     setTimeout(function () {
//         $('.pinterest-feed').masonry({
//             itemSelector: '.pinterest-feed-pin',
//             percentPosition: true
//         });
//     }, 1000);
// });