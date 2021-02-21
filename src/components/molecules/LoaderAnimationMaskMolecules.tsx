import LoaderAnimationAtoms from "../atoms/load/LoaderAnimationAtoms"
import MaskAtoms from "../atoms/MaskAtoms"

export type Props = {
  isOpen: boolean
}

const LoaderAnimationMaskMolecules = ({ isOpen }: Props) => {
  return (
    <MaskAtoms isOpen={isOpen}>
      <LoaderAnimationAtoms />
    </MaskAtoms>
  )
}

export default LoaderAnimationMaskMolecules
