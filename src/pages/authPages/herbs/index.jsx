import React, {useCallback, useEffect, useRef, useState} from 'react';
import s from './styles.module.css'
import {Input} from "antd";
import {useStore} from "../../../useStore";
import {observer} from "mobx-react-lite";
import Loader from "../../../components/Loader";
import {AgGridColumn, AgGridReact} from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';
import RowText from "../../../common/rowText"; // Optional theme CSS
import {isMobile} from 'react-device-detect';
import Allergens from "../../../common/fieldsTable/allergens";

const Herbs = observer(() => {
    const store = useStore()

    const gridRef = useRef();

    const [allHerbs, setAllHerbs] = useState([])
    const [search, setSearch] = useState('')
    const [search2, setSearch2] = useState('')


    const onPageSizeChanged = useCallback(() => {
        const value = document.getElementById('page-size').value;
        gridRef.current.api.paginationSetPageSize(Number(value));
    }, []);

    useEffect(() => {
        const getAllHerbs = async () => {
            await store.herbs.getAllHerbs()
            setAllHerbs(store.herbs.allHerbs)
        }
        getAllHerbs()
    }, [])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setSearch2(search)
            // Send Axios request here
        }, 300)

        return () => clearTimeout(delayDebounceFn)
    }, [search])

    const data = [...allHerbs.filter(item => {
        if (!search2) return true
        if (item?.common_name?.toLowerCase()?.includes(search2.toLowerCase()) ||
            item?.latin_name?.toLowerCase()?.includes(search2.toLowerCase()) ||
            item?.herb_name?.toLowerCase()?.includes(search2.toLowerCase()) ||
            item?.allergens?.find((el) => el.toLowerCase()?.includes(search2.toLowerCase())) ||
            item?.herb_code === +search2
        ) {
            return true
        }
    })];


    return (
        <div className={s.herbs}>
            <div className={s.header}>
                <p className={s.title}>Herbs list</p>
                <div className={s.search_pacient}>
                    <Input.Search placeholder="Find herbs" onChange={(e) => {
                        setSearch(e.target.value)
                    }} onSearch={setSearch}/>
                </div>
            </div>

            {store.herbs.isLoading ? <Loader/> :
                <div className="ag-theme-alpine table" style={{width: '100%', height: '100%', position: 'relative'}}>
                    <AgGridReact
                        style={{height: '100%', width: '100%'}}
                        rowData={data}
                        ref={gridRef}
                        rowSelection={'multiple'}
                        // pagination={true}
                        enableBrowserTooltips={true}
                        tooltipShowDelay={0}
                        tooltipHideDelay={2000}
                        // paginationAutoPageSize={true}
                        paginationPageSize={25}
                        defaultColDef={{
                            editable: true,
                            sortable: true,
                            flex: 1,
                            minWidth: isMobile ? 70 : 90,
                            filter: false,
                            floatingFilter: false,
                            resizable: true,
                            menuTabs: false,
                        }}
                        frameworkComponents={{
                            rowText: RowText,
                            allergens: Allergens,
                        }}
                    >

                        <AgGridColumn
                            headerName={isMobile ? '#' : "Code"}
                            field="herb_code"
                            editable={false}
                            sortable={false}
                            filter={false}
                            cellRenderer="rowText"
                            tooltipField='herb_code'
                            flex={0.1}
                            minWidth={isMobile ? 50 : 70}
                        />

                        <AgGridColumn
                            headerName={"Name"}
                            field="herb_name"
                            editable={false}
                            sortable={false}
                            filter={false}
                            cellRenderer="rowText"
                            cellRendererParams={{
                                weight: 500
                            }}
                            tooltipField='herb_name'
                            // flex={1.4}
                            minWidth={isMobile && 180}
                        />

                        <AgGridColumn
                            headerName={isMobile ? "$ per 1g" : "Common Name"}
                            field={isMobile ? "gram_cost" : "common_name"}
                            editable={false}
                            sortable={false}
                            filter={false}
                            cellRenderer="rowText"
                            tooltipField='common_name'
                            flex={1.4}
                            minWidth={isMobile && 100}
                        />

                        <AgGridColumn
                            headerName={"Latin Name"}
                            field="latin_name"
                            editable={false}
                            sortable={false}
                            filter={false}
                            // cellRenderer="rowText"
                            tooltipField='latin_name'
                            // flex={1.4}
                            minWidth={isMobile && 120}
                        />

                        <AgGridColumn
                            headerName={!isMobile ? "$ per 1g" : "Common Name"}
                            field={!isMobile ? "gram_cost" : "common_name"}
                            editable={false}
                            sortable={false}
                            filter={false}
                            cellRenderer="rowText"
                            tooltipField='gram_cost'
                            flex={0.6}
                            minWidth={isMobile && 140}
                        />

                        <AgGridColumn
                            headerName={"Allergens"}
                            field="allergens"
                            editable={false}
                            sortable={false}
                            filter={false}
                            cellRenderer="allergens"
                            tooltipField='allergens'
                            flex={0.6}
                            minWidth={isMobile && 120}
                        />

                    </AgGridReact>

                    {/*<div className={s.choose_pagination}>*/}
                    {/*    <select onChange={onPageSizeChanged} id="page-size">*/}
                    {/*        <option value="25" selected>25</option>*/}
                    {/*        <option value="50">50</option>*/}
                    {/*        <option value="75">75</option>*/}
                    {/*        <option value="100">100</option>*/}
                    {/*    </select>*/}
                    {/*</div>*/}
                </div>}
        </div>
    );
});

export default Herbs;
