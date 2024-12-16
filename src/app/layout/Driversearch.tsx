import React, { useEffect, useState } from 'react';
import { Input, Table } from 'semantic-ui-react';
import { Driver, Trace} from '../../models/DriverData';
import driverData from '../../data/drivers.json'; // Import the JSON file

const DriverSearch = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);

  useEffect(() => {
    // Simulate fetching data from JSON
    console.log('Loading driver data:', driverData);
    setDrivers(driverData.data);
  }, []);

  const filteredDrivers = drivers.filter(driver =>
    driver.forename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.vehicleRegistration.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTotalActivityTime = (traces: Trace[], type: string) => {
    return traces
      .flatMap(trace => trace.activity)
      .filter(activity => activity.type === type)
      .reduce((total, activity) => total + activity.duration, 0);
  };

  const getActivityForDay = (traces: Trace[], date: string) => {
    return traces.some(trace => trace.date === date && trace.activity.length > 0);
  };

  const weekDates = [
    "2021-02-01",
    "2021-02-02",
    "2021-02-03",
    "2021-02-04",
    "2021-02-05",
    "2021-02-06",
    "2021-02-07"
  ];

  const sortedDrivers = [...filteredDrivers].sort((a, b) => {
    if (sortConfig !== null) {
      const { key, direction } = sortConfig;
      const aValue = key === 'total' ? getTotalActivityTime(a.traces, 'drive') + getTotalActivityTime(a.traces, 'rest') :
                     key === 'drive' ? getTotalActivityTime(a.traces, 'drive') :
                     getTotalActivityTime(a.traces, 'rest');
      const bValue = key === 'total' ? getTotalActivityTime(b.traces, 'drive') + getTotalActivityTime(b.traces, 'rest') :
                     key === 'drive' ? getTotalActivityTime(b.traces, 'drive') :
                     getTotalActivityTime(b.traces, 'rest');
      if (aValue < bValue) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  console.log('Filtered and sorted drivers:', sortedDrivers);

  const handleSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="driver-search-container">
      <Input
        icon="search"
        placeholder="Search drivers..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="driver-list">
        <Table celled sortable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Registration</Table.HeaderCell>
              <Table.HeaderCell
                sorted={sortConfig?.key === 'total' ? sortConfig.direction : undefined}
                onClick={() => handleSort('total')}
              >
                Total Time
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={sortConfig?.key === 'drive' ? sortConfig.direction : undefined}
                onClick={() => handleSort('drive')}
              >
                Total Drive Time
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={sortConfig?.key === 'rest' ? sortConfig.direction : undefined}
                onClick={() => handleSort('rest')}
              >
                Total Rest Time
              </Table.HeaderCell>
              {weekDates.map(date => (
                <Table.HeaderCell key={date}>{date}</Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {sortedDrivers.map(driver => {
              const totalDriveTime = getTotalActivityTime(driver.traces, 'drive');
              const totalRestTime = getTotalActivityTime(driver.traces, 'rest');
              const totalTime = totalDriveTime + totalRestTime;
              const adjustedDriveTime = totalDriveTime - totalRestTime;

              return (
                <Table.Row key={driver.driverID}>
                  <Table.Cell>{driver.forename} {driver.surname}</Table.Cell>
                  <Table.Cell>{driver.vehicleRegistration}</Table.Cell>
                  <Table.Cell>{totalTime} mins</Table.Cell>
                  <Table.Cell>{adjustedDriveTime} mins</Table.Cell>
                  <Table.Cell>{totalRestTime} mins</Table.Cell>
                  {weekDates.map(date => (
                    <Table.Cell key={date} style={{backgroundColor: getActivityForDay(driver.traces, date) ? 'green' : 'transparent'}}></Table.Cell>
                  ))}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default DriverSearch;