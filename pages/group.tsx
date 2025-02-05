import LugaresGuardados from '@/components/commons/LugaresGuardados';
import Presupuesto from '@/components/commons/Presupuesto';
import CustomRangeCalendar from '@/components/commons/CustomRangeCalendar';
import React from "react";
import {useAuth} from "@/context/AuthContext";


export default function Group() {

  const {
        isAuthenticated,
        user,
        currentGroup,
        groupLoading,
        groupError,
        fetchUserGroups
    } = useAuth();

  React.useEffect(() => {
    // Cada vez que el usuario cambie, se actualiza el grupo
    if (isAuthenticated && user) {
        fetchUserGroups();
    }
  }, [isAuthenticated, user]);

  if (!user) {
    return <div>Please sign in to view your group.</div>;
  }

  if (groupLoading) {
        return <div>Loading group...</div>;
    }

    if (groupError) {
        return <div>Error: {groupError}</div>;
    }

    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
          {currentGroup && (
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-4">Group: {currentGroup.name}</h1>
                </div>
            )}
        <div className="flex-grow flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
            <LugaresGuardados />
            <Presupuesto />
            <CustomRangeCalendar />
          </div>
        </div>
      </div>
    );
  }
