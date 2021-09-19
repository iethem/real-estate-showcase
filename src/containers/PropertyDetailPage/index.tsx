import { memo } from "react";
import { useParams } from "react-router";

import Image from "components/Image";
import { usePropertyList } from "utils/usePropertyList";

function PropertyDetailPage() {
  const { propertyList } = usePropertyList();
  const { propertyId } = useParams<any>();
  const property = propertyList.find((item) => item.id === propertyId);

  if (!propertyList.length) return null;

  if (!property) {
    return <div>Property not found!</div>;
  }

  return (
    <div className="property-area">
      <div className="row">
        <div className="col-12">
          <h1>{property.title}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6">
          <Image
            width="100%"
            src={property.mainPhotoURL}
            alt={property.title}
          />
        </div>

        <div className="col-12 col-md-6">
          <ul>
            <li>
              <strong>Created Date</strong>
              <span>{new Date(property.createdDate).toLocaleDateString("en-US")}</span>
            </li>
            <li>
              <strong>Province</strong>
              <span>{property.province}</span>
            </li>
            <li>
              <strong>Price</strong>
              <span>{property.price}</span>
            </li>
            <li>
              <strong>Flat Floor</strong>
              <span>{property.flatFloor}</span>
            </li>
            <li>
              <strong>Square Meter</strong>
              <span>{property.squareMeter}</span>
            </li>
            <li>
              <strong>Room Count</strong>
              <span>{property.roomCount}</span>
            </li>
            <li>
              <strong>Bathroom Count</strong>
              <span>{property.bathroomCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default memo(PropertyDetailPage);
