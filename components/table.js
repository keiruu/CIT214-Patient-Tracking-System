
import styles from '../styles/Patients.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import { usePagination } from 'react-table/dist/react-table.development'
// A great library for fuzzy filtering/sorting items
import matchSorter from 'match-sorter'
import React, { useState } from 'react';
import { db } from '../src/firebase';
import { useEffect } from 'react';
import { getDocs, collection, getFirestore, query,  } from 'firebase/firestore';



// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  try {
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 200)
  } catch (error) {
    console.log("Error: " + error);
  }

  return (
    <span className={styles.searchContainer}> 
      <input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        // placeholder={`${count} records...`}
        placeholder="Search for patient"
        className={styles.filter}
      />
      <div>
        {/* Date: */}
      </div>
      
      {/* Diri ka nath tandog */}
      <div>
        {/* <Link href="/identification" passHref>
        </Link> */}
        <button className={styles.btnAddPatient} onClick={() => {
            // Diri ka code nath, kung pano e open ang modal


        }}>
          <FontAwesomeIcon icon={faUserPlus} size="lg" className={styles.addPatient} />
        </button>
      </div>
    </span>
  )
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}


function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

// Our table component
function Table({ columns, data }) {
  
  const filterTypes = React.useMemo(
    
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    page, 
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      initialState: { pageIndex: 0 },
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    usePagination
  )
 
  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  const firstPageRows = rows.slice(0, 10)

  return (
    <>
      <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
      <table {...getTableProps()} className={styles.patientTable}>
        <thead>
          
          {headerGroups.map(headerGroup => (
            
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}
                style={{
                  borderBottom: '1px solid #DBDDE0',
                  background: '#F3F4F6',
                  color: 'black',
                  fontFamily: 'Lato',
                  padding: '2rem 3rem',
                }}
                >
                  {column.render('Header')}
                  {/* <div>{column.canFilter ? column.render('Filter') : null}</div> */}
                  {/* Render the columns filter UI */}
                </th>
              ))}
            </tr>
          ))}
          {/* <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: 'left',
              }}
            >
            </th>
          </tr> */}
        </thead>
        
        <tbody {...getTableBodyProps()}>
          
          
          {firstPageRows.map((row, i) => {
            prepareRow(row)
            
            return (
              <tr {...row.getRowProps()}>
                
                {row.cells.map(cell => {
                 
                  return <td {...cell.getCellProps()}
                    style={{
                      padding: '25px 10px',
                      background: 'white',
                      borderBottom: '1px solid #F2F6FE'
                    }}
                  >{cell.render('Cell')}
                  </td>
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
      
    </>
  )
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter(row => {
    const rowValue = row.values[id]
    return rowValue >= filterValue
  })
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = val => typeof val !== 'number'



  const Patient = () => {
    const [diagnosisData, setDiagnosisData] = useState([])
   

    useEffect(() => {
    
            const getData = async () => {
              const db = getFirestore()
              const q = query(collection(db, 'patientInfo'))
              const snapshot = await getDocs(q)
              const data = snapshot.docs.map((doc)=>({
                  ...doc.data(), id:doc.id
              }))
              data.map(async (element)=>{
                const diagnosisQ = query(collection(db, `patientInfo/${element.id}/diagnosis`))
                const diagnosisDetails = await getDocs(diagnosisQ)
                const diagnosisInfo = diagnosisDetails.docs.map((doc)=>({
                    ...doc.data(),
                     id:doc.id
                }))
                console.log(diagnosisInfo);
              })
           
            }
            getData()

        
    }, )

  
  // Column names
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

  // Set icon size sa actions
  const size = 'lg'

  // Change according to how you would get patient data
  
  
  // Value of columns
  
  
  const data = React.useMemo(
    () => 
        
      diagnosisData.map((element) => 
       (
        
         {
           col1: key = element.id,
           col2: element.Fname,
           col3: element.date,
           col4: element.data.visitationTime,
           col5: element.data.date,
           col6: (
           <div className={styles.actions}>
             <FontAwesomeIcon icon={faPen} size={size} className={styles.edit} />
             <FontAwesomeIcon icon={faTrash} size={size} className={styles.delete} />
             
           </div>
           
           )
         },
        ) // It works, and you know what to do if something works.. DON'T TOUCH IT. Will figure out how to fix it but it works anyways
     )
    , []
 )

  return ( 
    
  <Table columns={columns} data={data} />
    

   
  )

  }
export default Patient