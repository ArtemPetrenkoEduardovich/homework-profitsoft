package com.company.homeworkprofitsoft.data;

import lombok.*;

import javax.persistence.Embeddable;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Setter
@Getter
public class Address {
    private String town;
    private String street;
    private String house;
}
