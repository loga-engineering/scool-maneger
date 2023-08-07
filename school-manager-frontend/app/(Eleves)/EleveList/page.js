"use client"
import {useState, useEffect} from 'react'
import axios from 'axios'
import Eleve from '../Eleve/page'

const EleveList = () => {

  const SCHOOL_MANAGER_API_BASE_URL = "http://localhost:8080/school-management/eleves";
  const [eleves, setEleves] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
        const fetchData = async() => {
            //setLoading(true);
            try{
                const response = await axios.get(SCHOOL_MANAGER_API_BASE_URL)
                setEleves(response.data)
            } catch(error){
                console.log(error)
            }
            setLoading(false)

        };
        fetchData();
  }, [])

  return (
    <div>
        {loading ? (
            <h3>Chargement...</h3>
        ) : (
            <div className="container mx-auto my-8">
                <div className="flex shadow border-b">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                        Matricule
                        </th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                        Nom
                        </th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                        Prénom
                        </th>
                        <th className="text-right font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                        Date de naissance
                        </th>
                        <th className="text-right font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                        Action
                        </th>
                    </tr>
                    </thead>
                    {!loading && (
                    <tbody className="bg-white">
                        {eleves?.map((eleve) => (
                        <Eleve
                            eleve={eleve}
                            key={eleve.id}
                        />
                        ))}
                    </tbody>
                    )}
                </table>
                </div>
            </div>

        )}

    </div>
  )
}

export default EleveList