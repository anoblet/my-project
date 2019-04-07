Objective:
  - Ask for/provide latitude/longitude values
  - We want to provide a function that returns a user's postion
  - The function must by async or callback oriented since getCurrentPosition is async

  - getPosition
    - Wrapper for the `navigator.geolocation.getCurrentPosition function`
  - getPositionTemplate
    - Pure function to provide a button template that takes a callback function to be called when a position is available or latitude/longitude changes;
