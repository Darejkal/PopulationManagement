import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	IHouseholdSlice,
	getHouseholdDetail,
} from "../../redux/slices/householdSlice";
import { Table } from "react-bootstrap";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { IStoreType } from "../../redux/store";
import { useFetch } from "../../utils/useFetch";
import { toast } from "react-toastify";
import { isAdmin } from "../../redux/slices/canboSlice";
import { 
    MaterialReactTable, 
    useMaterialReactTable, 
    type MRT_Row,
    createMRTColumnHelper
} from "material-react-table";
import { userInfos } from "../../utils/info";
import { BASE_URL, base_url } from "../../utils/config";
import { useTimeField } from "@mui/x-date-pickers/TimeField/useTimeField";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from 'export-to-csv'; 
import { Box, Button, Icon, IconButton } from '@mui/material';
import { csvConfig } from "../../utils/config";
import { Check, Close, Delete, Edit } from "@mui/icons-material";
import ModalConfirm from "../../pages/FeeManager/Component/ModalConfirm";
type IFeeHouseholdRel = {
    household: String,
    name: String,
    fee: String,
    startTime: Date,
    lateTime: Date,
    paymentTime?: Date,
    amount: Number,
    status: boolean,
    relList: String,
    required: boolean,
}

export default function HouseholdFeeExpandPage(){
    const {id}=useParams()
    const household = useSelector((state) => state?.household?.householdDetail);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [feeRels,setFeeRels]=useState<(IFeeHouseholdRel&{_id:string})[]>([])
    const fetch = useFetch();
	const [totalDebt,setTotalDebt]=useState<number>(0);
    const [isCurrentAdmin, setIsCurrentAdmin]=useState<boolean>(false);
    useEffect(() => {
		dispatch(isAdmin())
			.unwrap()
			.then((v) => {
				if (v === true) {
					setIsCurrentAdmin(true)
				}
			});
	}, []);
    useEffect(()=>{
        let debt=feeRels.reduce((pre,val)=>{
            try{
                if(val.required&&!val.status){
                    pre+=val.amount
                }
            } catch(e){
                console.log(e)
            }
            return pre
        },0)
        setTotalDebt(debt)
    },[feeRels])
    const getFeeRelOfHousehold=(id)=>{
        fetch.get(BASE_URL+"/fees/getFeeRelOfHousehold/"+id).then((v)=>{
        console.log(v);
        setFeeRels(v.feeRels)
        toast.dismiss()
          toast.success("Lấy thông tin phí thành công")
        }).catch((e)=>{
        toast.dismiss()
          toast.warning("Lấy thông tin phí thất bại!")
    
        })
      }
    // get first time data
    useEffect(() => {
        getFeeHouseholdList(id);
        getFeeRelOfHousehold(id);
    }, [dispatch, id]);

    const getFeeHouseholdList = (id) => {
        dispatch(getHouseholdDetail(id));
    };
    
    const renderHouseholdDetails = (household) => {
        return (
            <Table striped bordered>
            <tbody>
            <tr>
                <td>Số hộ khẩu</td>
                <td>{household?.name}</td>
            </tr>
            <tr>
                <td>Chủ hộ</td>
                <td>{household?.owner?.firstname??"" + ' ' + household?.owner?.lastName??""}</td>
            </tr>
            <tr>
                <td>Địa chỉ</td>
                <td>{household?.address}</td>
            </tr>
            </tbody>
            </Table>
        );
    };

    const handleExportHouseholdRows = (rows: MRT_Row<IFeeHouseholdRel>[]) => {
        const rowData = rows.map((row) => {
            let data=row.original
            if("_id" in data){
                delete data._id
            }
            if("_v" in data){
                delete data._v
            }
            data.householdname=household?.name
            data.householdowner=household?.owner?.firstname??"" + ' ' + household?.owner?.lastName??""
            data.householdaddress=household?.address
            return data
        });
        const csv = generateCsv(csvConfig)(rowData);
        download(csvConfig)(csv);
    };    

    return <>
        <h2>Thông tin hộ khẩu</h2>
        <div style={{ marginTop: "1rem", width: "30rem" }}>
          {renderHouseholdDetails(household)}
        </div>
        <div style={{marginTop:"1rem"}}></div>

        <h3>Thông tin các khoản phí và đóng góp</h3>
        <MaterialReactTable
            data = {feeRels??[]}
            displayColumnDefOptions={ {
                'mrt-row-actions': {
                  header: 'Chỉnh sửa', 
                },
              }}
            enableRowActions={isCurrentAdmin}
            renderRowActions={({row})=>{
                let currentdate=Date.now()
                return (
                <div style={{display:"flex"}}>
                <IconButton style={{color:(row.original.status?"red":"green")}} onClick={()=>{
                    fetch.post(BASE_URL+"/fees/updaterelation",{
                        updates: {
                            status:row.original.status?false:true,
                            paymentTime:row.original.status?undefined:currentdate
                        },
                        id:row.original._id
                    }).then(()=>{
                        setFeeRels((pre)=>(pre.map((v)=>{
                            if(v._id===row.original._id){
                                v.paymentTime=v.status?undefined:currentdate
                                v.status=v.status?false:true
                            }
                            return v
                        })))
                    }).catch(()=>{
                        toast.warning("Có lỗi khi truy vấn")
                    })
                }}>{row.original.status?<Close/>:<Check/>}</IconButton>
                    <DeleteHouseholdFeeModal
                        feeHouseholdRel={row.original}
                        household={household}
                    />
                </div>
            )}}
            columns={[
                {
                    accessorKey: "name",
                    header: "Tên phí",
                },
                {
                    accessorKey: "required",
                    header: "Bắt buộc",
                    Cell:({cell})=>(<>{cell.getValue()===true?"Bắt buộc":"Không bắt buộc"}</>)

                },
                {
                    accessorKey: "paymentTime",
                    header: "Thời gian nộp phí",
                    Cell:({cell})=>{
                        let cellValue=cell.getValue();
                        if (cellValue){
                            return (<>{String(Date(cellValue)).replace('GMT+0700 (Indochina Time)'," ")}</>)
                        }
                        return (<></>)
                    }
                    
                },
                {
                    accessorKey: "amount",
                    header: "Số tiền"
                },
                {
                    accessorKey: "status",
                    header: "Tình trạng",
                    Cell:({cell})=>(<>{cell.getValue()?"Đã đóng":"Chưa đóng"}</>)
                },
                {
                    accessorKey: "startTime",
                    header: "Bắt đầu thu từ",
                    
                    Cell:({cell})=>(<>{String(Date(cell.getValue())).replace('GMT+0700 (Indochina Time)'," ")}</>)
                },
                {
                    accessorKey: "lateTime",
                    header: "Nộp muộn nhất vào",
                    Cell:({cell})=>(<>{String(Date(cell.getValue())).replace('GMT+0700 (Indochina Time)'," ")}</>)
                }
            ]}
            renderTopToolbarCustomActions={ ({ table }) => (
                <Box
                  sx={{
                    display: 'flex',
                    gap: '16px',
                    padding: '8px',
                    flexWrap: 'wrap',
                  }}
                >
                  <Button
                    disabled={table.getRowModel().rows.length === 0}
                    onClick={() => handleExportHouseholdRows(table.getFilteredRowModel().rows)}
                    startIcon={<FileDownloadIcon />}
                    >
                    Trích xuất dữ liệu
                  </Button>
                  
                </Box>
            )}
        />
        <div style={{ marginTop: "2rem",display:"flex",flexDirection:"row",justifyContent:"end",alignItems:"end" }}>
        <p>Tổng nợ: {totalDebt}</p>
        </div>
    </>
}
function DeleteHouseholdFeeModal({feeHouseholdRel,household}:{feeHouseholdRel:IFeeHouseholdRel&{_id:string},household:IHousehold}){
    const [showModal,setShowModal]=useState<boolean>(false);
    const fetch=useFetch();
    const navigate=useNavigate();
    return (
        <>
        <IconButton onClick={()=>{
            setShowModal(true);
        }}>
            <Delete/>
        </IconButton>
        <ModalConfirm
            show={showModal}
            handleClose={()=>{
                setShowModal(false)
            }}
            title={`Xóa yêu cầu khoản phí`}
            description={`Xóa yêu cầu khoản phí ${feeHouseholdRel.name??""} này khỏi hộ gia đình ${household.name??""}`}
            confirmLabel="Xóa"
            dismissLabel="Hủy"
            handleAction={()=>{
                toast.info("Đang xóa khoản phí...")
                fetch.post(BASE_URL+"/fees/deleterelation",{
                    id:feeHouseholdRel._id
                }).then(()=>{
                    toast.dismiss()
                    toast.success("Xóa khoản phí thu thành công!")
                    setShowModal(false)
                    navigate(0)
                }).catch((e)=>{
                    toast.dismiss()
                    toast.warning("Xóa khoản phí thu thất bại!")

                })
            }}
        />
        </>
    )
}