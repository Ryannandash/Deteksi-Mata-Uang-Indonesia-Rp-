import PageHeader from '../components/layout/PageHeader'
import BanknoteCard from '../components/banknotes/BanknoteCard'
import { BANKNOTES } from '../constants/banknotes'

const BanknotesPage = () => (
  <div>
    <PageHeader
      title="Informasi Nominal"
      description="Referensi 7 nominal uang kertas rupiah yang dikenali oleh model, lengkap dengan ciri visual utamanya."
    />
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {BANKNOTES.map((note) => (
        <BanknoteCard key={note.classLabel} note={note} />
      ))}
    </div>
  </div>
)

export default BanknotesPage
