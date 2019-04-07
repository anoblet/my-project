Context/use cases:
  - A weather component needs lat/long
  - Should we fire an event/or accept a callback?

Objective:
  - Ask for/provide latitude/longitude values
  - We want to provide a function that returns a user's postion { latitude: string, longitude: string } fromat
  - The function should be async or have a callback specified since getCurrentPosition is async

  - getPosition
    - Wrapper for the `navigator.geolocation.getCurrentPosition function`
  - getPositionTemplate
    - Pure function to provide a button template that takes a callback function to be called when a position is available or latitude/longitude changes;
