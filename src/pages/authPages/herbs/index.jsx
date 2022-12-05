import React, {useEffect, useRef, useState} from 'react';
import s from './styles.module.css'
import {Input, Table} from "antd";
import {useStore} from "../../../useStore";
import {observer} from "mobx-react-lite";
import Loader from "../../../components/Loader";
import {AgGridColumn, AgGridReact} from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';
import RowText from "../../../common/rowText"; // Optional theme CSS

const Herbs = observer(() => {
    const store = useStore()

    const [allHerbs, setAllHerbs] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        const getAllHerbs = async () => {
            await store.herbs.getAllHerbs()
            setAllHerbs(store.herbs.allHerbs)
        }
        getAllHerbs()
    }, [])

    const data = [...allHerbs.filter(item => {
        if (!search) return true
        if (item.herb_name.toLowerCase().includes(search.toLowerCase())) {
            return true
        }
    })];


    return (
        <div className={s.herbs}>
            <div className={s.header}>
                <p className={s.title}>Herbs list</p>
                <div className={s.search_pacient}>
                    <Input.Search placeholder="Find herbs" onSearch={setSearch}/>
                </div>
            </div>

            {store.herbs.isLoading ? <Loader/> :
                <div className="ag-theme-alpine table" style={{width: '100%', height: '100%'}}>
                    <AgGridReact
                        style={{height: '100%', width: '100%'}}
                        rowData={data}
                        rowSelection={'multiple'}
                        pagination={true}
                        enableBrowserTooltips={true}
                        tooltipShowDelay={0}
                        tooltipHideDelay={2000}
                        // paginationAutoPageSize={true}
                        paginationPageSize={20}
                        defaultColDef={{
                            editable: true,
                            sortable: true,
                            flex: 1,
                            minWidth: 150,
                            filter: false,
                            floatingFilter: false,
                            resizable: true,
                            menuTabs: false,
                        }}
                        frameworkComponents={{
                            rowText: RowText,
                        }}
                    >

                        <AgGridColumn
                            headerName={"Code"}
                            field="herb_code"
                            editable={true}
                            sortable={false}
                            filter={false}
                            cellRenderer="rowText"
                            tooltipField='herb_code'
                            flex={0.1}
                        />

                        <AgGridColumn
                            headerName={"Name"}
                            field="herb_name"
                            editable={true}
                            sortable={false}
                            filter={false}
                            cellRenderer="rowText"
                            cellRendererParams={{
                                weight: 500
                            }}
                            tooltipField='herb_name'
                            flex={1.4}
                        />

                        <AgGridColumn
                            headerName={"Common Name"}
                            field="common_name"
                            editable={true}
                            sortable={false}
                            filter={false}
                            cellRenderer="rowText"
                            tooltipField='common_name'
                            flex={1.4}
                        />

                        <AgGridColumn
                            headerName={"Latin Name"}
                            field="latin_name"
                            editable={true}
                            sortable={false}
                            filter={false}
                            cellRenderer="rowText"
                            tooltipField='latin_name'
                            flex={1.4}
                        />

                        <AgGridColumn
                            headerName={"Gram cost"}
                            field="gram_cost"
                            editable={true}
                            sortable={false}
                            filter={false}
                            cellRenderer="rowText"
                            tooltipField='gram_cost'
                            flex={0.6}
                        />

                        <AgGridColumn
                            headerName={"Allergens"}
                            field="allergens"
                            editable={true}
                            sortable={false}
                            filter={false}
                            cellRenderer="rowText"
                            tooltipField='allergens'
                            flex={0.6}
                        />

                    </AgGridReact>
                </div>}
        </div>
    );
});

export default Herbs;
