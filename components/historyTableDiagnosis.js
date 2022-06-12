/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import styles from '../styles/Patients.module.css'
import Link from 'next/link'
import { getDocs, collection, getFirestore, query, where, doc, getDoc  } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBillTrendUp, faPen, faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import { usePagination } from 'react-table/dist/react-table.development'
// A great library for fuzzy filtering/sorting items
import matchSorter from 'match-sorter'
import { useAuth } from '../src/authContext'
import { useRouter } from 'next/router'

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
      {/* <input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }} */}
        {/* // placeholder={`${count} records...`}
        // placeholder="Search for patient"
        // className={styles.filter} */}
      {/* /> */}
      {/* <div>
        Date:
      </div>
      <div className={styles.btnAddPatient}>
        <Link href="/identification" passHref>
          <FontAwesomeIcon icon={faUserPlus} size="lg" className={styles.addPatient} />
        </Link>
      </div> */}
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
                  >{cell.render('Cell')}</td>
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

const History = () => {
  const [diagnosisData, setDiagnosisData] = useState([{}])
  const { patientDiagnosisHistory, getPatientDiagnosisHistory } = useAuth()
  const [ deets, setDeets ] = useState(null)
  const [ data, setData ] = useState()
  const [ patientHistory, setPatientHistory ] = useState()
  const router = useRouter()
  const [ parentDoc, setParentDoc ] = useState()
 
  useEffect(() => {
    const route = router.asPath.split("/")
    const routeID = route[route.length-1]
    console.log("routeID ", routeID)

    const getParentDoc = async (id) => {
        const db = getFirestore()
        const q = query(collection(db, 'patientInfo'))
        const snapshot = await getDocs(q)
        const data = snapshot.docs.map((doc)=>({
            ...doc.data(), id:doc.id
        }))
        data.map(async (element)=>{
            const diagnosisQ = query(collection(db, `patientInfo/${element.id}/diagnosis`))
            const diagnosisDetails = await getDocs(diagnosisQ)
            const diagnosisInfo = diagnosisDetails.docs.map(async (doc)=>{
                console.log("ref path THIS" , doc.ref.path);
                console.log("ref parent" , doc.ref.parent.parent.id);
                const ref = doc.ref.path.split("/")
                const refPath = ref[ref.length - 1]

                if(refPath === routeID){
                    setParentDoc(doc.ref.parent.parent.id)
                    console.log(doc.ref.parent.parent.id)
                }
            })
        })
    }

    const getHistory = async (routeID) => {
      const db = getFirestore()
      const q = query(collection(db, 'patientInfo'))
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map((doc)=>({
          ...doc.data(), id:doc.id
      }))
      await getParentDoc()
      .then(() => {
        data.map(async (element) => {
            const diagnosisQ = query(collection(db, `patientInfo/${parentDoc}/diagnosis`))
            const diagnosisDetails = await getDocs(diagnosisQ)
            const diagnosisInfo = diagnosisDetails.docs.map((doc)=>({
                ...doc.data(),
                  id:doc.id
            })) 
      
            if(diagnosisInfo.length > 0) {
              setDeets(diagnosisInfo.map((element) => 
                ({
                  col1: element.diagnosis,
                  col2: element.date,
                  col3: element.visitationTime,
                  col4: (
                  <div className={styles.actions}>
                    <FontAwesomeIcon icon={faPen} size={size} className={styles.edit} />
                    <FontAwesomeIcon icon={faTrash} size={size} className={styles.delete} />
                  </div>
                  )
                })
              ))
              return diagnosisInfo
            } else {
              setDeets(null)
            }
          })
      })
    }  

    const handleGet = async (routeID) => {
      await getHistory(routeID)
    }
  
    handleGet(routeID).catch(console.error)
  }, [])
  
  // Column names
  
  const columns = React.useMemo(
    () => [
      {
        Header: 'Diagnosis',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Date',
        accessor: 'col2',
      },
      {
        Header: 'Visitation Time',
        accessor: 'col3', 
      },
      {
        Header: 'Actions',
        accessor: 'col4',
      },

    ],
    
    []
  )
  
  // Set icon size sa actions
  const size = 'lg'

  return (
    <div>
     {deets ? <Table columns={columns} data={deets}/> : 
      <div className={styles.noHistory}>
        <p>Patient has no history yet.</p>
      </div>
    }
    </div>
  )
}

export default History
