const express = require ('express');
const request = require ('request');
const config = require ('config');
const router = express.Router ();
const auth = require ('../../middleware/auth');
const {check, validationResult} = require ('express-validator');
const normalize = require ('normalize-url');
const Profile = require ('../../models/Profile');
const User = require ('../../models/User');

//@route GET api/profile/me
//desc: get current users profile
//access priv

router.get ('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne ({
      user: req.user.id,
    }).populate ('user', ['name', 'email', 'avatar']);

    if (!profile) {
      return res
        .status (400)
        .json ({msg: 'There is no profile for this user.'});
    }

    res.json (profile);
  } catch (err) {
    console.error (err.message);
    res.status (500).send ('Server Error');
  }
});

//@route POST api/profile/me
//desc: create or upd user prof
//access priv

router.post (
  '/',
  [
    auth,
    [
      check ('status', 'Status is required').not ().isEmpty (),
      check ('skills', 'Skills is required').not ().isEmpty (),
    ],
  ],
  async (req, res) => {
    const errors = validationResult (req);
    if (!errors.isEmpty ()) {
      return res.status (400).json ({errors: errors.array ()});
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      avatar,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    //build profile object

    const profileFields = {
      user: req.user.id,
      company,
      location,
      website: website === '' ? '' : normalize (website, {forceHttps: true}),
      bio,
      skills: Array.isArray (skills)
        ? skills
        : skills.split (',').map (skill => ' ' + skill.trim ()),
      status,
      githubusername,
      avatar,
    };

    // const socialfields = {youtube, twitter, instagram, linkedin, facebook};

    // for (const [key, value] of Object.entries (socialfields)) {
    //   if (value.length > 0)
    //     socialfields[key] = normalize (value, {forceHttps: true});
    // }
    // profileFields.social = socialfields;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate (
        {user: req.user.id},
        {$set: profileFields},
        {new: true, upsert: true}
      );
      res.json (profile);
    } catch (err) {
      console.error (err.message);
      res.status (500).send ('Server Error');
    }
  }
);

//@route GET api/profile
//desc: get all profs
//access public

router.get ('/', async (req, res) => {
  try {
    const profiles = await Profile.find ().populate ('user', [
      'name',
      'email',
      'avatar',
    ]);
    res.json (profiles);
  } catch (err) {
    console.error (err.message);
    res.status (500).send ('Server Error');
  }
});

//@route GET api/profile/user/:user_id
//desc: get prof by user id
//access public

router.get ('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne ({
      user: req.params.user_id,
    }).populate ('user', ['name', 'avatar']);

    if (!profile) return res.status (400).json ({msg: 'Profile not found.'});

    res.json (profile);
  } catch (err) {
    console.error (err.message);

    if (err.kind == 'ObjectId') {
      return res.status (400).json ({msg: 'Profile not found.'});
    }

    res.status (500).send ('Server Error');
  }
});

//@route DELETE api/profile
//desc: delete prof, user, posts
//access priv

router.delete ('/', auth, async (req, res) => {
  try {
    //remove user posts
    await Post.postMany ({user: req.user.id});

    //remove profiles
    await Profile.findOneAndRemove ({user: req.user.id});
    //remove user
    await User.findOneAndRemove ({_id: req.user.id});

    res.json ({mg: 'User deleted.'});
  } catch (err) {
    console.error (err.message);
    res.status (500).send ('Server Error');
  }
});

//@route put api/experience
//desc: add profile experience
//access priv

router.put (
  '/experience',
  [
    auth,
    [
      check ('title', 'Title is required').not ().isEmpty (),
      check ('company', 'Company is required').not ().isEmpty (),
      check ('from', 'From date is required').not ().isEmpty (),
    ],
  ],
  async (req, res) => {
    const errors = validationResult (req);
    if (!errors.isEmpty ()) {
      return res.status (400).json ({errors: errors.array ()});
    }

    const {title, company, location, from, to, current, description} = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne ({user: req.user.id});
      profile.experience.unshift (newExp);
      await profile.save ();

      res.json (profile);
    } catch (err) {
      console.error (err.message);
      res.status (500).send ('Server Error');
    }
  }
);

//@route DELETE api/profile/experience/:exp_id
//desc: delete profile experience
//access priv

router.delete ('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne ({user: req.user.id});

    //get remove index

    const removeIndex = profile.experience
      .map (item => item.id)
      .indexOf (req.params.exp_id);

    profile.experience.splice (removeIndex, 1);

    await profile.save ();

    res.json (profile);
  } catch (err) {
    console.error (err.message);
    res.status (500).send ('Server Error');
  }
});

//@route put api/education
//desc: add profile edu
//access priv

router.put (
  '/education',
  [
    auth,
    [
      check ('school', 'School is required').not ().isEmpty (),
      check ('degree', 'Degree is required').not ().isEmpty (),
      check ('fieldofstudy', 'Field of study is required').not ().isEmpty (),
      check ('from', 'From date is required').not ().isEmpty (),
    ],
  ],
  async (req, res) => {
    const errors = validationResult (req);
    if (!errors.isEmpty ()) {
      return res.status (400).json ({errors: errors.array ()});
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne ({user: req.user.id});
      profile.education.unshift (newEdu);
      await profile.save ();

      res.json (profile);
    } catch (err) {
      console.error (err.message);
      res.status (500).send ('Server Error');
    }
  }
);

//@route DELETE api/profile/education/:edu_id
//desc: delete profile education
//access priv

router.delete ('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne ({user: req.user.id});

    //get remove index

    const removeIndex = profile.education
      .map (item => item.id)
      .indexOf (req.params.edu_id);

    profile.education.splice (removeIndex, 1);

    await profile.save ();

    res.json (profile);
  } catch (err) {
    console.error (err.message);
    res.status (500).send ('Server Error');
  }
});

//@route get/api/profile/github/:username
//desc: get user repos
//access public

router.get ('/github/:username', (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get ('githubClientId')}&client_secret=${config.get ('githubSecret')}`,
      method: 'GET',
      headers: {'user-agent': 'node.js'},
    };

    request (options, (error, response, body) => {
      if (error) console.error (error);

      if (response.statusCode !== 200) {
        return res.status (404).json ({msg: 'No Github profile found.'});
      }

      res.json (JSON.parse (body));
    });
  } catch (err) {
    console.error (err.message);
    res.status (500).send ('Server Error');
  }
});

module.exports = router;
