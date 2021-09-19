import { memo } from "react";
import { useHistory } from "react-router";

import Map from "containers/Map";
import Table from "components/Table";
import Image from "components/Image";
import Pagination from "components/Pagination";
import TextInput from "components/TextInput";
import DropdownMenu from "components/DropdownMenu";
import Loader from "components/Loader";

import { usePropertyList } from "utils/usePropertyList";
import { useLoader } from "utils/useLoader";


function HomePage() {
  const { loading } = useLoader();
  const { propertyList } = usePropertyList();

  const history = useHistory();
  const { showingItems, sorting, paging, filtering, stats } = Table.useTable(
    propertyList,
    {
      sortKey: "price",
      sortDir: "desc",
      filterKeys: [
        "title",
        "id",
        "province",
        "price",
        "flatFloor",
        "squareMeter",
        "roomCount",
        "bathroomCount",
        "latitude",
        "longitude",
        "mainPhotoURL",
        "createdDate",
      ],
      pageSize: 10,
    }
  );

  const dropdownItems = [
    { key: "price_desc", value: "Decreasing by price" },
    { key: "price_asc", value: "Increasing by price" },
    { key: "date_desc", value: "Descending by date" },
    { key: "date_asc", value: "Ascending by date" },
  ];

  // sorting.onSort can be defined as a key for dropdownItems??
  function onFilterChanged(value: string) {
    switch (value) {
      case "price_asc":
        sorting.onSort("price", "asc");
        break;
      case "price_desc":
        sorting.onSort("price", "desc");
        break;
      case "date_asc":
        sorting.onSort("createdDate", "asc");
        break;
      case "date_desc":
        sorting.onSort("createdDate", "desc");
        break;
      default:
        sorting.onSort("price", "asc");
        break;
    }
  }

  function onTableRowClick(propertyId: string) {
    history.push(propertyId);
  }

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="border-blue">
            <Map items={showingItems} />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-8">
          <div className="search">
            <TextInput
              value={filtering.filterText}
              onChange={filtering.setFilterText}
              placeholder="Search..."
            />
          </div>
        </div>

        <div className="col-12 col-md-4">
          <DropdownMenu options={dropdownItems} onOptionClicked={onFilterChanged} />
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="table-area border-blue">
            {loading ? <Loader /> : (<>
              Showing {stats.start} - {stats.end} of {stats.totalItems}
            <Table>
              <Table.Head>
                <Table.Row>
                  <Table.Column> </Table.Column>
                  <Table.Column>Title</Table.Column>
                  <Table.Column>Province</Table.Column>
                  <Table.Column>Price</Table.Column>
                  <Table.Column>Flat Floor</Table.Column>
                  <Table.Column>Square Meter</Table.Column>
                  <Table.Column>Room Count</Table.Column>
                  <Table.Column>Bathroom Count</Table.Column>
                  <Table.Column>Created Date</Table.Column>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {showingItems.map((item: any, index: any) => (
                  <Table.Row key={`${index}:${item.title}`} onClick={() => onTableRowClick(item.id)}>
                    <Table.Cell>
                      <Image
                        src={item.mainPhotoURL}
                        width="64px"
                        height="64px"
                        alt={item.title}
                      />
                    </Table.Cell>
                    <Table.Cell>{item.title}</Table.Cell>
                    <Table.Cell>{item.province}</Table.Cell>
                    <Table.Cell>{item.price}</Table.Cell>
                    <Table.Cell>{item.flatFloor}</Table.Cell>
                    <Table.Cell>{item.squareMeter}</Table.Cell>
                    <Table.Cell>{item.roomCount}</Table.Cell>
                    <Table.Cell>{item.bathroomCount}</Table.Cell>
                    <Table.Cell>
                      {new Date(item.createdDate).toLocaleDateString("en-US")}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <Pagination
              totalPages={paging.totalPages}
              onPageChanged={paging.goTo}
            />
            
            </>)}
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(HomePage);
