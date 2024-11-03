import React, { useEffect, useState } from 'react'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import customFetch from '../utils/customFetch'
import LogoMaryG from '../assets/maryg.png'
import Stamp from '../assets/stamp.png'


const CatResult = () => {
    const { id } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const [studentResult, setStudentResult] = useState([])
    const [loading, setLoading] = useState(true)

    const term = searchParams.get("term")
    const session = searchParams.get("session")

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await customFetch.get(`/assessments/${id}?term=${term}&session=${session}`)
                setStudentResult(res?.data?.data)
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false)
            }
        }

        fetchResults()
    }, [id, term, session])

    if (loading) return <p>Loading results...</p>;

    return (
        <div className="main-content p-10">
            <div className="main-title border-b-2 pb-2">
                <h1 className='text-xl font-semibold'>Mid-Term Result Sheet</h1>
            </div>
            <div className="main-content-body pt-8">


                <table className='table-auto w-1/2 border border-collapse'>
                    <tbody>
                        <tr>
                            <td rowSpan="2" colSpan="3" className="border border-slate-400 border-r-0"><img src={LogoMaryG} alt="Mary Gold Logo" className='min-w-52 h-auto' /> </td>
                            <td colSpan="4" className="border border-slate-400 border-l-0 text-blue-950 mary-g">MARY<span className='text-yellow-400'>GOLD</span> INTERNATIONAL SCHOOL
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="4" className="border border-slate-400 border-l-0 mary-g-address">14 OBAME IKOYA STREET, BEHIND CALABAR MUNICIPAL COUNCIL, CALABAR, CROSS RIVER STATE; TEL: 08033167499</td>
                        </tr>
                        <tr>
                            <td colSpan="7" className="border border-slate-400 text-center mary-g-sec">SECONDARY SCHOOL MID-TERM REPORT SHEET</td>
                        </tr>
                        <tr className='mary-g-address'>
                            <td className="border border-slate-400 w-3/4">NAME OF STUDENT </td>
                            <td colSpan="6" className="border border-slate-400 pl-2">OKPOK, SYLVIA OKON</td>
                        </tr>
                        <tr className='mary-g-address'>
                            <td className="border border-slate-400">SESSION </td>
                            <td colSpan="6" className="border border-slate-400 pl-2">2024/2025; FIRST TERM</td>
                        </tr>
                        <tr className='mary-g-address'>
                            <td className="border border-slate-400">CLASS </td>
                            <td colSpan="6" className="border border-slate-400 pl-2">JSS 3</td>
                        </tr>
                        <tr className='mary-g-address'>
                            <td className="border border-slate-400">CLASS ARM </td>
                            <td colSpan="6" className="border border-slate-400 pl-2">FLAMINGO </td>
                        </tr>
                        <tr className='mary-g-address'>
                            <td className="border border-slate-400">DATE </td>
                            <td colSpan="6" className="border border-slate-400 pl-2">23-10-2024</td>
                        </tr>
                        <tr className='mary-g-address'>
                            <td className="border border-slate-400">AVERAGE (%) </td>
                            <td colSpan="6" className="border border-slate-400 pl-2">78.23</td>
                        </tr>

                    </tbody>
                </table>

                <table className='table-auto score-table mary-g-address text-center border border-collapse text-blue-950 border-t-0'>
                    <thead>
                        <tr>
                            <th className="border border-t-0 border-slate-400">S/N</th>
                            <th className="border border-t-0 w-2/5 border-slate-400">Subject</th>
                            <th className="border border-t-0 border-slate-400">CAT 1 (10)</th>
                            <th className="border border-t-0 border-slate-400">CAT 2 (10)</th>
                            <th className="border border-t-0 border-slate-400">Total (20)</th>
                            <th className="border border-t-0 border-slate-400">Total (%)</th>
                        </tr>

                    </thead>
                    <tbody>
                        {studentResult?.length > 0 ? (
                            studentResult.map((result, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="border border-slate-400">{index + 1} </td>
                                        <td className="border w-2/5 text-left border-slate-400">{result.subject.name} </td>
                                        <td className="border border-slate-400 font-bold">{result.assessments.firstCA} </td>
                                        <td className="border border-slate-400 font-bold">{result.assessments.secondCA} </td>
                                        <td className="border border-slate-400 font-bold">{result.midTermTotal} </td>
                                        <td className="border border-slate-400 font-bold">{Math.round((result.midTermTotal / 20) * 100)}% </td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td colSpan="6" className='text-center italic p-4'>No Result Found!</td>
                            </tr>
                        )}

                    </tbody>
                </table>
                <table className='table-auto score-table mary-g-address mt-5 border border-collapse text-blue-950'>
                    <tbody>
                        <tr className='h-20 flex align-top w-full border border-slate-400'>
                            <td className=' font-bold break-words w-full'>ACADEMIC ADVISER'S REMARK: <span className='comment'>PRAISE-GOD, YOU HAVE GREAT ORATORY SKILLS. HOWEVER, MINIMIZE NOISE MAKING IN CLASS.</span> </td>
                        </tr>
                        <tr className='h-20 flex align-top w-full border border-t-0 border-slate-400 relative'>
                            <td className=' font-bold'>PRINCIPAL'S SIGNATURE/DATE:</td>
                            <td>
                                <img src={Stamp} alt="School stamp" className='w-40 h-auto absolute -top-10 -rotate-12 right-36'/>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CatResult
