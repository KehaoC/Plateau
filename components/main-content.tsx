import { ViewType } from '@/lib/types'
import { ScrollArea } from "@/components/ui/scroll-area"
import { FeaturedContent } from "@/components/feature-content"
import { DepartmentPersonalization } from "@/components/department-personalization"
import { PatientPersonalization } from "@/components/patient-personalization"
import { LibraryContent } from "@/components/library-content"


export function MainContent({ activeView }: { activeView: ViewType }) {
  return (
    <ScrollArea className="flex-1">
      <div className="p-6 space-y-6">
        {activeView === 'featured' && <FeaturedContent />}
        {activeView === 'department' && <DepartmentPersonalization />}
        {activeView === 'patient' && <PatientPersonalization />}
        {activeView === 'library' && <LibraryContent />}
      </div>
    </ScrollArea>
  )
}