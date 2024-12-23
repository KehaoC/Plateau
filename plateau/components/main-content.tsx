import { ScrollArea } from "@/components/ui/scroll-area"
import { ViewType } from '@/lib/types'
import { FeaturedContent } from "./feature-content"
import { DepartmentPersonalization } from "./department-personalization"
import { PatientPersonalization } from "./patient-personalization"
import { AllSongs } from "./all-songs"

export function MainContent({ activeView }: { activeView: ViewType }) {
  return (
    <ScrollArea className="flex-1">
      <div className="p-6 space-y-6">
        {activeView === 'department' && <DepartmentPersonalization />}
        {activeView === 'patient' && <PatientPersonalization />}
        
        {activeView === 'featured' && (
          <>
            <FeaturedContent />
          </>
        )}
      </div>
    </ScrollArea>
  )
}