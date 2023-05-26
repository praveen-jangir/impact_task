import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTable, useSortBy } from 'react-table';
import { fetchData, updatePrice, savePrices, resetPrices } from './actions';

const ProductTable = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const originalData = useSelector((state) => state.originalData);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handlePriceChange = (recipeId, newValue) => {
    dispatch(updatePrice(recipeId, newValue));
  };

  const handleSave = () => {
    dispatch(savePrices());
  };

  const handleReset = () => {
    dispatch(resetPrices(originalData));
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        sortType: 'alphanumeric',
      },
      {
        Header: 'Image',
        accessor: 'image',
        Cell: ({ value }) => <img src={value} alt="Recipe" style={{ width: '50px' }} />,
      },
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'Label',
        accessor: 'label',
      },
      {
        Header: 'Price',
        accessor: 'price',
        Cell: ({ row, value }) => (
          <input
            type="number"
            value={value}
            onChange={(e) => handlePriceChange(row.original.id, e.target.value)}
          />
        ),
        sortType: 'numeric',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: data }, useSortBy);

  return (
    <div>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleReset}>Reset</button>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
