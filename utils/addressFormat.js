export function AddressFormat(address) {
  return `Strada ${address?.street}, Nr. ${address?.number}, ${address?.blockApartment}, ${address?.city}, ${address?.county}`;
}
