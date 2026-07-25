# Profile Customization Folder

Welcome to the profiles customization folder! Here you can customize the profile picture icons, names, handles, and their matching avatars used when generating posts.

## How to add Profile Picture Icons
1. Add your `.png` icon files directly into this directory (`src/assets/profiles/`).
2. **Recommended Size**: **400 × 400 pixels** (or any 1:1 square ratio, minimum 200 × 200 pixels).
3. **Format**: `.png` (transparent or solid background).

## How to Configure Matched Profiles & Avatars
1. Open `profiles.json` located in this folder (`src/assets/profiles/profiles.json`).
2. Add or modify entries in the `"profiles"` array, specifying the matching `avatar` filename (e.g. `"avatar1.png"` or `"avatar1"`):

```json
{
  "profiles": [
    {
      "name": "Neutral Voice",
      "handle": "@the_neutral_take",
      "avatar": "avatar1.png"
    },
    {
      "name": "Diplomatic Centrist",
      "handle": "@both_sides_matter",
      "avatar": "avatar2.png"
    }
  ]
}
```

3. Whenever a post is generated, a random profile entry (including its name, handle, and matching avatar image) will be selected.
