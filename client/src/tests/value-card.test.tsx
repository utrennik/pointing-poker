import { ValueCard } from "@components/ui/value-card/value-card"
import { render } from "@testing-library/react"

const mockData = {
  valueCardID:"123",
  name:"MIS",
  value:"100500",
}



describe("Value Card",() => {

  it("should render default state",() => {

   const {getByText,getByDisplayValue} =  render(<ValueCard
    name={mockData.name}
    value={mockData.value}
    valueCardID={mockData.valueCardID}
    />);
    const title = getByText(/MIS/i);
    const value = getByDisplayValue(/100500/i);
    expect(title).toHaveClass('value-card-name')
    expect(value).toHaveValue('100500')
  })




})