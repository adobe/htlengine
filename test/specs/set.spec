#
### set variable
#
<span data-sly-set.profile="${user.profile}">Hello, ${profile.firstName} ${profile.lastName}!</span>
<a class="profile-link" href="${profile.url}">Edit your profile</a>
===
<span>Hello, John Doe!</span>
<a class="profile-link" href="about:blank()">Edit your profile</a>
#
### set variable is case insensitive
#
<span data-sly-set.userprofile="${user.profile}">Hello, ${userProfile.firstName} ${userProfile.lastName}!</span>
===
<span>Hello, John Doe!</span>
#
### set variable is case insensitive 2
#
<span data-sly-set.userProfile="${user.profile}">Hello, ${userprofile.firstName} ${userprofile.lastName}!</span>
===
<span>Hello, John Doe!</span>
#
### set variable with test
#
<span data-sly-set.profile="${user.profile}" data-sly-test="${profile}">Hello, ${profile.firstName} ${profile.lastName}!</span>
===
<span>Hello, John Doe!</span>
#
###
