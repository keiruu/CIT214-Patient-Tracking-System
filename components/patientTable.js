/* eslint-disable react/jsx-key */
import { useTable } from 'react-table'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/Patients.module.css'
import { usePagination } from 'react-table/dist/react-table.development'
 
export default function PatientTable() {

  // Sample data change according to how you would get it sa DB
  const patientData = [
    {
      name: 'Zenrick',
      contactNumber: 'Parcon',
      date: '04/25/2022',
      visitationTime: '9:15-9:45 AM',
      diagnosis: 'Fever & Cough'
    },
    {
      name: 'Thrys',
      contactNumber: 'Formoso',
      date: '04/25/2022',
      visitationTime: '9:45-10:30 AM',
      diagnosis: 'Fever'
    },
    {
      name: 'Abigail Kaye',
      contactNumber: 'Unating',
      date: '04/25/2022',
      visitationTime: '10:30-11:05 AM',
      diagnosis: 'Diarrhea'
    },
  ]

  const size = 'lg'
  const data = React.useMemo(
     () => 
       patientData.map(patient => 
        (
          {
            col1: patient.name,
            col2: patient.contactNumber,
            col3: patient.date,
            col4: patient.visitationTime,
            col5: patient.diagnosis,
            col6: (
            <div className={styles.actions}>
              <FontAwesomeIcon icon={faPen} size={size} className={styles.edit} />
              <FontAwesomeIcon icon={faTrash} size={size} className={styles.delete} />
            </div>
            )
          },
        ) // It works, and you know what to do if something works.. DON'T TOUCH IT. 
      )
     , []
  )
 
  // Column Names
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Contact Number',
        accessor: 'col2',
      },
      {
        Header: 'Date',
        accessor: 'col3', 
      },
      {
        Header: 'Visitation Time',
        accessor: 'col4',
      },
      {
        Header: 'Latest Diagnosis',
        accessor: 'col5',
      },
      {
        Header: 'Actions',
        accessor: 'col6',
      },
    ],
    []
  )

  // Important stuff from the package, don't touch
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({ columns, data, initialState: { pageIndex: 0 }, }, usePagination)

  return (
    <div>
      {/* 
      Just to view the numbers
      {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
            },
            null,
            0
      )} */}

      <table {...getTableProps()} className={styles.patientTable}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: '1px solid #DBDDE0',
                  background: '#F3F4F6',
                  color: 'black',
                  fontFamily: 'Lato',
                  padding: '2rem 3rem',
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '25px 10px',
                      background: 'white',
                      borderBottom: '1px solid #F2F6FE'
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
      </table>

      <div className={styles.pagination}>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        {/* <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select> */}
      </div>
      
    </div>
  )
 }