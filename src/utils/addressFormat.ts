export function AddressFormat(location) {
  if (location?.blockApartment === undefined) {
    return `${location?.street}, ${location?.number}, ${location?.city}, ${location?.county}`;
  } else {
    return `${location?.street}, ${location?.number}, ${location?.blockApartment}, ${location?.city}, ${location?.county}`;
  }
}
